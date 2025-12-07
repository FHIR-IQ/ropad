import { useState, useEffect } from 'react';
import { Pill, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

interface Medication {
    id: number;
    name: string;
    dosage: string;
    time: string;
    taken: boolean;
    notes?: string;
}

export default function MedicationTracker() {
    // Initialize from localStorage or default
    const [meds, setMeds] = useState<Medication[]>(() => {
        const saved = localStorage.getItem('medication_schedule');
        if (saved) {
            return JSON.parse(saved);
        }
        return [
            { id: 1, name: 'Ritalin', dosage: '10mg', time: '8:00 AM', taken: false, notes: 'Taken with breakfast' },
            { id: 2, name: 'Vitamin D', dosage: '1000IU', time: '8:00 AM', taken: true },
            { id: 3, name: 'Ritalin', dosage: '10mg', time: '2:00 PM', taken: false, notes: 'Upcoming' },
        ];
    });

    // Persistence
    useEffect(() => {
        localStorage.setItem('medication_schedule', JSON.stringify(meds));
    }, [meds]);

    const [sideEffectOpen, setSideEffectOpen] = useState(false);
    const [reportText, setReportText] = useState('');

    const toggleTaken = (id: number) => {
        const medication = meds.find(m => m.id === id);
        if (medication && !medication.taken) {
            // Trigger confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#8b5cf6', '#d946ef', '#06b6d4']
            });
        }
        setMeds(meds.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
    };

    const handleSubmitReport = () => {
        if (!reportText.trim()) return;
        setSideEffectOpen(false);
        setReportText('');
        alert('Report logged successfully.');
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="heading-md text-gradient">Medication Tracker</h1>
                    <p className="text-secondary">Manage daily dosages and track health records.</p>
                </div>
                <button
                    onClick={() => setSideEffectOpen(!sideEffectOpen)}
                    className="btn-primary flex items-center gap-2"
                >
                    <AlertCircle size={18} />
                    <span>Log Side Effect</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Medication List */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
                    {meds.map((med) => (
                        <motion.div
                            key={med.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: med.taken ? 0.8 : 1,
                                scale: med.taken ? 0.98 : 1,
                                backgroundColor: med.taken ? 'rgba(34, 197, 94, 0.05)' : 'rgba(255, 255, 255, 0.03)'
                            }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            className={`glass-panel p-4 flex items-center justify-between border ${med.taken ? 'border-green-500/20' : 'border-white/10'}`}
                            title={med.taken ? "Click to undo" : "Click to mark as taken"}
                        >
                            <div className="flex items-center gap-4">
                                <motion.div
                                    whileTap={{ scale: 0.9 }}
                                    className={`p-3 rounded-xl transition-colors ${med.taken ? 'bg-green-500/20 text-green-400' : 'bg-primary/20 text-primary'}`}
                                >
                                    <Pill size={24} />
                                </motion.div>
                                <div>
                                    <h3 className={`font-semibold text-lg transition-colors ${med.taken && 'text-text-muted line-through'}`}>{med.name}</h3>
                                    <p className="text-secondary text-sm">{med.dosage} • {med.time}</p>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => toggleTaken(med.id)}
                                className={`p-3 rounded-full transition-colors ${med.taken
                                    ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]'
                                    : 'bg-white/5 hover:bg-primary hover:text-white'
                                    }`}
                            >
                                {med.taken ? <CheckCircle size={24} /> : <div className="w-6 h-6 border-2 border-current rounded-full" />}
                            </motion.button>
                        </motion.div>
                    ))}

                    <button className="w-full glass-card p-4 border-dashed border-2 border-white/10 flex items-center justify-center gap-2 text-text-muted hover:text-white hover:border-white/20">
                        <Plus size={20} />
                        <span>Add Medication</span>
                    </button>
                </div>

                {/* Stats / Info */}
                <div className="space-y-6">
                    <div className="glass-panel p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
                        <h3 className="text-lg font-semibold mb-2">Research & Insights</h3>
                        <p className="text-text-secondary text-sm leading-relaxed mb-4">
                            Latest research suggests consistent sleep schedules can improve medication efficacy by up to 20%. Consider adjusting the evening routine.
                        </p>
                        <a href="#" className="text-primary text-sm hover:underline">Read more insights &rarr;</a>
                    </div>

                    {sideEffectOpen && (
                        <div className="glass-panel p-6 animate-in slide-in-from-right duration-300">
                            <h3 className="text-lg font-semibold mb-4 text-warning flex items-center gap-2">
                                <AlertCircle size={20} />
                                Report Concern
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-text-secondary mb-1">Observation</label>
                                    <textarea
                                        value={reportText}
                                        onChange={(e) => setReportText(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                                        rows={3}
                                        placeholder="e.g. Loss of appetite, irritability..."
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => setSideEffectOpen(false)}
                                        className="btn-ghost text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmitReport}
                                        disabled={!reportText.trim()}
                                        className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Submit Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
