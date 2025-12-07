import { useState, useEffect } from 'react';
import { X, User, ChevronRight, Shield, Sparkles, Clock, Bell } from 'lucide-react';

const features = [
    { icon: Clock, title: 'Screen Time Management', desc: 'Set healthy limits for apps and games' },
    { icon: Bell, title: 'Medication Reminders', desc: 'Never miss a dose with smart alerts' },
    { icon: Sparkles, title: 'AI-Powered Insights', desc: 'Get personalized recommendations' },
];

export const OnboardingModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        childName: 'Leo',
        focusGoal: 'Both'
    });

    useEffect(() => {
        const hasOnboarded = localStorage.getItem('has_onboarded');
        if (!hasOnboarded) {
            const timer = setTimeout(() => setIsOpen(true), 800);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleComplete = () => {
        setIsOpen(false);
        localStorage.setItem('has_onboarded', 'true');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="glass-panel w-full max-w-lg p-8 relative animate-in zoom-in-95 duration-300 border border-white/20 shadow-2xl">
                <button
                    onClick={handleComplete}
                    className="absolute top-4 right-4 p-2 text-text-muted hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                    <X size={20} />
                </button>

                {step === 1 ? (
                    <div className="space-y-8">
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                                <Shield size={40} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Welcome to ADHD Guardian</h2>
                            <p className="text-text-secondary max-w-sm mx-auto">
                                Your intelligent co-parenting assistant for children with ADHD. Let's get you set up.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="p-2 rounded-lg bg-primary/20">
                                        <feature.icon size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white text-sm">{feature.title}</h3>
                                        <p className="text-xs text-text-muted">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-base"
                        >
                            <span>Get Started</span>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                                <User size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Set Up Your Profile</h2>
                            <p className="text-text-secondary text-sm">Personalize the experience for your child.</p>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-secondary">Child's Name</label>
                                <input
                                    type="text"
                                    value={formData.childName}
                                    onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white focus:border-primary focus:outline-none focus:bg-white/8 transition-all"
                                    placeholder="Enter child's name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-secondary">Primary Focus</label>
                                <select
                                    value={formData.focusGoal}
                                    onChange={(e) => setFormData({ ...formData, focusGoal: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white focus:border-primary focus:outline-none"
                                >
                                    <option value="Screen Time">Manage Screen Time</option>
                                    <option value="Medication">Improve Medication Routine</option>
                                    <option value="Both">Both</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => setStep(1)}
                                className="btn-ghost flex-1 py-3 border border-white/10"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleComplete}
                                className="btn-primary flex-1 flex items-center justify-center gap-2 py-3"
                            >
                                <span>Start Monitoring</span>
                                <ChevronRight size={18} />
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-xs text-text-muted/60 pt-2">
                            <Shield size={12} />
                            <span>Data stored locally on your device. Zero cloud tracking.</span>
                        </div>
                    </div>
                )}

                {/* Step Indicator */}
                <div className="flex justify-center gap-2 mt-6">
                    <div className={`w-2 h-2 rounded-full transition-colors ${step === 1 ? 'bg-primary' : 'bg-white/20'}`}></div>
                    <div className={`w-2 h-2 rounded-full transition-colors ${step === 2 ? 'bg-primary' : 'bg-white/20'}`}></div>
                </div>
            </div>
        </div>
    );
};
