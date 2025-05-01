
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    containerRef.current.appendChild(renderer.domElement);
    
    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000; // Increased particle count
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    // Create random positions, colors, and scales
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create a spherical distribution
      const radius = 25 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
      
      // Create gradient colors from purple to blue
      colorArray[i] = 0.6 + Math.random() * 0.4; // R: Purple range
      colorArray[i + 1] = 0.3 + Math.random() * 0.3; // G: Low
      colorArray[i + 2] = 0.8 + Math.random() * 0.2; // B: Blue range
    }
    
    for (let i = 0; i < particlesCount; i++) {
      scaleArray[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    // Material with vertex colors
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      sizeAttenuation: true
    });
    
    // Points
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add a central glow
    const glowGeometry = new THREE.SphereGeometry(5, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x9b87f5,
      transparent: true,
      opacity: 0.15
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 100;
      mouseY = (event.clientY - window.innerHeight / 2) / 100;
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', onWindowResize);
    
    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.001;
      requestAnimationFrame(animate);
      
      // More complex rotation
      particlesMesh.rotation.x = Math.sin(time * 0.2) * 0.1;
      particlesMesh.rotation.y = Math.cos(time * 0.3) * 0.1;
      particlesMesh.rotation.z += 0.001;
      
      // Wave pattern animation
      const positions = particlesGeometry.attributes.position.array;
      const scales = particlesGeometry.attributes.scale.array;
      
      for (let i = 0; i < particlesCount * 3; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        
        // Apply wave effect
        const waveX = Math.sin(time * 2 + x * 0.1) * 0.2;
        const waveY = Math.cos(time * 3 + y * 0.1) * 0.2;
        const waveZ = Math.sin(time * 1.5 + z * 0.1) * 0.2;
        
        positions[i] = posArray[i] + waveX;
        positions[i + 1] = posArray[i + 1] + waveY;
        positions[i + 2] = posArray[i + 2] + waveZ;
      }
      
      particlesGeometry.attributes.position.needsUpdate = true;
      
      // Pulse the central glow
      glowMesh.scale.set(
        1 + Math.sin(time * 3) * 0.2,
        1 + Math.sin(time * 3) * 0.2,
        1 + Math.sin(time * 3) * 0.2
      );
      
      // Smooth camera movement based on mouse position
      camera.position.x += (mouseX - camera.position.x) * 0.03;
      camera.position.y += (-mouseY - camera.position.y) * 0.03;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
    };
  }, []);
  
  return <div ref={containerRef} id="canvas-container" className="animated-background" />;
};

export default AnimatedBackground;
