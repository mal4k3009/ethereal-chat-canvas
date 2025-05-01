
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
    
    // Create two separate particle systems
    // Main particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3500;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    // Create random positions, colors, and scales with variety
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create a spherical distribution
      const radius = 30 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
      
      // Create teal to cyan gradient colors
      colorArray[i] = 0.2 + Math.random() * 0.3; // R: low
      colorArray[i + 1] = 0.7 + Math.random() * 0.3; // G: high
      colorArray[i + 2] = 0.8 + Math.random() * 0.2; // B: high-medium
    }
    
    for (let i = 0; i < particlesCount; i++) {
      scaleArray[i] = Math.random() * 1.5;
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
    
    // Secondary smaller particles
    const smallParticlesGeometry = new THREE.BufferGeometry();
    const smallParticlesCount = 2000;
    const smallPosArray = new Float32Array(smallParticlesCount * 3);
    
    for (let i = 0; i < smallParticlesCount * 3; i += 3) {
      // Create a wider distribution
      smallPosArray[i] = (Math.random() - 0.5) * 100;
      smallPosArray[i + 1] = (Math.random() - 0.5) * 100;
      smallPosArray[i + 2] = (Math.random() - 0.5) * 100;
    }
    
    smallParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(smallPosArray, 3));
    
    const smallParticlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x4BCDC3,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    
    const smallParticlesMesh = new THREE.Points(smallParticlesGeometry, smallParticlesMaterial);
    scene.add(smallParticlesMesh);
    
    // Add a central glow
    const glowGeometry = new THREE.SphereGeometry(5, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x4BCDC3,
      transparent: true,
      opacity: 0.15
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);
    
    // Create ambient light objects
    const createLightOrb = (x: number, y: number, z: number, size: number, color: number) => {
      const orbGeometry = new THREE.SphereGeometry(size, 16, 16);
      const orbMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.6
      });
      const orb = new THREE.Mesh(orbGeometry, orbMaterial);
      orb.position.set(x, y, z);
      scene.add(orb);
      return orb;
    };
    
    // Add a few light orbs
    const orb1 = createLightOrb(15, 10, -10, 1.5, 0x4BCDC3);
    const orb2 = createLightOrb(-20, -15, 5, 2, 0x39A99E);
    const orb3 = createLightOrb(0, -20, 15, 1, 0x55E6DB);
    
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
      particlesMesh.rotation.x = Math.sin(time * 0.3) * 0.1;
      particlesMesh.rotation.y = Math.cos(time * 0.2) * 0.1;
      particlesMesh.rotation.z += 0.001;
      
      smallParticlesMesh.rotation.x = Math.sin(time * 0.2) * 0.05;
      smallParticlesMesh.rotation.y = Math.cos(time * 0.3) * 0.05;
      smallParticlesMesh.rotation.z -= 0.0005;
      
      // Animated orbs
      orb1.position.y = 10 + Math.sin(time * 1.5) * 3;
      orb2.position.x = -20 + Math.cos(time * 0.8) * 5;
      orb3.position.z = 15 + Math.sin(time * 1.2) * 4;
      
      // Wave pattern animation
      const positions = particlesGeometry.attributes.position.array;
      const scales = particlesGeometry.attributes.scale.array;
      
      for (let i = 0; i < particlesCount * 3; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        
        // Apply wave effect
        const waveX = Math.sin(time * 2 + x * 0.1) * 0.3;
        const waveY = Math.cos(time * 3 + y * 0.1) * 0.3;
        const waveZ = Math.sin(time * 1.5 + z * 0.1) * 0.3;
        
        positions[i] = posArray[i] + waveX;
        positions[i + 1] = posArray[i + 1] + waveY;
        positions[i + 2] = posArray[i + 2] + waveZ;
      }
      
      particlesGeometry.attributes.position.needsUpdate = true;
      
      // Pulse the central glow
      const pulseScale = 1 + Math.sin(time * 3) * 0.2;
      glowMesh.scale.set(pulseScale, pulseScale, pulseScale);
      
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
