import { useState, useEffect } from 'react';
import { X, User, ChevronRight, Shield } from 'lucide-react';

export const OnboardingModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasOnboarded = localStorage.getItem('has_onboarded');
        if (!hasOnboarded) {
            // Small delay for effect
            const timer = setTimeout(() => setIsOpen(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleComplete = () => {
        setIsOpen(false);
        localStorage.setItem('has_onboarded', 'true');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="glass-panel w-full max-w-md p-8 relative animate-in zoom-in-95 duration-300 border border-white/20 shadow-2xl">
                <button
                    onClick={handleComplete}
                    className="absolute top-4 right-4 text-text-muted hover:text-white"
                >
                    <X size={24} />
                </button>

                <div className="text-center space-y-6">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                        <User size={32} />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Welcome to ADHD Guardian</h2>
                        <p className="text-text-secondary">Let's set up a personalized environment for your child.</p>
                    </div>

                    <div className="space-y-4 text-left">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary">Child's Name</label>
                            <input
                                type="text"
                                defaultValue="Leo"
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary">Focus Goal</label>
                            <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none">
                                <option>Manage Screen Time</option>
                                <option> Improve Medication Routine</option>
                                <option>Both</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleComplete}
                        className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-lg"
                    >
                        <span>Start Monitoring</span>
                        <ChevronRight size={20} />
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs text-text-muted/60 mt-4">
                        <Shield size={12} />
                        <span>Data stored locally on your device. Zero cloud tracking.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
