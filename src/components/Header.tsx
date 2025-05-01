
import React, { useState } from 'react';
import { Settings, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';

const Header: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [saveHistory, setSaveHistory] = useState(false);

  const handleSettingsChange = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
    setShowSettings(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-morphism">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gemini-accent to-gemini-secondary mr-2"></div>
          <h1 className="text-xl font-semibold text-white">Gemini <span className="text-gemini-accent">AI</span></h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white/70 hover:text-white"
            onClick={() => setShowInfo(true)}
          >
            <Info size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white/70 hover:text-white"
            onClick={() => setShowSettings(true)}
          >
            <Settings size={18} />
          </Button>
        </div>
      </div>

      {/* Info Dialog */}
      <Dialog open={showInfo} onOpenChange={setShowInfo}>
        <DialogContent className="sm:max-w-md bg-gemini-dark text-white border-gemini-accent/20">
          <DialogHeader>
            <DialogTitle className="text-gemini-accent">About Gemini AI</DialogTitle>
            <DialogDescription className="text-white/80">
              Gemini AI is an advanced conversational assistant designed to help you with information, tasks, and more.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-white/70">
              This AI combines natural language understanding with powerful knowledge to provide helpful, accurate responses to your questions.
            </p>
            <div className="bg-white/5 p-3 rounded-lg">
              <h4 className="font-medium text-gemini-accent mb-2">Capabilities:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-white/70">
                <li>Answer questions on various topics</li>
                <li>Generate creative content</li>
                <li>Translate languages</li>
                <li>Summarize information</li>
                <li>Assist with tasks and planning</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInfo(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-md bg-gemini-dark text-white border-gemini-accent/20">
          <DialogHeader>
            <DialogTitle className="text-gemini-accent">Settings</DialogTitle>
            <DialogDescription className="text-white/80">
              Customize your Gemini AI experience.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Notifications</Label>
                <p className="text-xs text-white/60">
                  Receive alerts about new features and updates.
                </p>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
                className="data-[state=checked]:bg-gemini-accent"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Dark Mode</Label>
                <p className="text-xs text-white/60">
                  Use a darker theme for low light environments.
                </p>
              </div>
              <Switch 
                checked={darkMode} 
                onCheckedChange={setDarkMode} 
                className="data-[state=checked]:bg-gemini-accent"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Save Chat History</Label>
                <p className="text-xs text-white/60">
                  Store your conversations for future reference.
                </p>
              </div>
              <Switch 
                checked={saveHistory}
                onCheckedChange={setSaveHistory} 
                className="data-[state=checked]:bg-gemini-accent"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettings(false)} className="mr-2">
              Cancel
            </Button>
            <Button onClick={handleSettingsChange} className="bg-gemini-accent hover:bg-gemini-accent/80">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
