import { useState, useEffect } from 'react';
import { Pill, CheckCircle, Plus, Clock, TrendingUp, Calendar, Info, FileText, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { StatCard, ProgressBar, InsightCard } from '../components/ui';
import type { BehavioralInsight, SeverityLevel } from '../types';

interface Medication {
    id: number;
    name: string;
    dosage: string;
    time: string;
    taken: boolean;
    takenAt?: string;
    notes?: string;
}

const weeklyStats = [
    { day: 'Mon', completed: 3, total: 3 },
    { day: 'Tue', completed: 3, total: 3 },
    { day: 'Wed', completed: 2, total: 3 },
    { day: 'Thu', completed: 3, total: 3 },
    { day: 'Fri', completed: 3, total: 3 },
    { day: 'Sat', completed: 1, total: 3 },
    { day: 'Sun', completed: 0, total: 3 },
];

const sideEffectOptions = [
    { id: 'appetiteLoss', label: 'Appetite Loss', icon: '🍽️' },
    { id: 'sleepDifficulty', label: 'Sleep Difficulty', icon: '😴' },
    { id: 'headache', label: 'Headache', icon: '🤕' },
    { id: 'stomachache', label: 'Stomachache', icon: '🤢' },
    { id: 'moodChanges', label: 'Mood Changes', icon: '😔' },
    { id: 'irritability', label: 'Irritability', icon: '😠' },
];

const medicationInsight: BehavioralInsight = {
    id: 'med-insight-1',
    type: 'pattern',
    category: 'medication',
    evidenceLevel: 'high',
    title: 'Timing Affects Effectiveness',
    description: "Leo's focus is 15% higher when medication is taken within 30 minutes of the scheduled time. Morning doses taken before 8:15 AM show the best results.",
    actionableSteps: [
        'Set alarm 5 minutes before medication time',
        'Keep medication in a visible, consistent location',
    ],
    generatedAt: new Date(),
    dismissed: false,
    actedOn: false,
};

export default function MedicationTracker() {
    const [meds, setMeds] = useState<Medication[]>(() => {
        const saved = localStorage.getItem('medication_schedule');
        if (saved) {
            return JSON.parse(saved);
        }
        return [
            { id: 1, name: 'Ritalin', dosage: '10mg', time: '8:00 AM', taken: true, takenAt: '8:03 AM', notes: 'Taken with breakfast' },
            { id: 2, name: 'Vitamin D', dosage: '1000IU', time: '8:00 AM', taken: true, takenAt: '8:03 AM' },
            { id: 3, name: 'Ritalin', dosage: '10mg', time: '12:00 PM', taken: false, notes: 'Take with lunch' },
            { id: 4, name: 'Ritalin', dosage: '5mg', time: '4:00 PM', taken: false, notes: 'Afternoon booster' },
        ];
    });

    const [sideEffectOpen, setSideEffectOpen] = useState(false);
    const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, SeverityLevel>>({});
    const [reportNotes, setReportNotes] = useState('');
    const [expandedMed, setExpandedMed] = useState<number | null>(null);

    useEffect(() => {
        localStorage.setItem('medication_schedule', JSON.stringify(meds));
    }, [meds]);

    const toggleTaken = (id: number) => {
        const medication = meds.find(m => m.id === id);
        if (medication && !medication.taken) {
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.6 },
                colors: ['#10b981', '#6366f1', '#d946ef']
            });
        }
        const now = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        setMeds(meds.map(m => m.id === id ? { ...m, taken: !m.taken, takenAt: !m.taken ? now : undefined } : m));
    };

    const handleSymptomToggle = (symptomId: string) => {
        setSelectedSymptoms(prev => {
            const current = prev[symptomId] || 0;
            const next = current >= 3 ? 0 : (current + 1) as SeverityLevel;
            if (next === 0) {
                const { [symptomId]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [symptomId]: next };
        });
    };

    const handleSubmitReport = () => {
        if (Object.keys(selectedSymptoms).length === 0 && !reportNotes.trim()) return;
        setSideEffectOpen(false);
        setSelectedSymptoms({});
        setReportNotes('');
        // Show success feedback
        alert('Side effect report logged. This will be included in your provider report.');
    };

    const completedToday = meds.filter(m => m.taken).length;
    const totalToday = meds.length;
    const completionRate = Math.round((completedToday / totalToday) * 100);

    const pendingMeds = meds.filter(m => !m.taken);
    const takenMeds = meds.filter(m => m.taken);

    const severityLabels = ['None', 'Mild', 'Moderate', 'Severe'];
    const severityColors = ['bg-white/10', 'bg-yellow-500/30', 'bg-orange-500/30', 'bg-red-500/30'];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="heading-md text-gradient">Medication Tracker</h1>
                    <p className="text-secondary">Manage daily dosages and track health records.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn btn-sm btn-secondary">
                        <Calendar size={16} />
                        <span>History</span>
                    </button>
                    <button className="btn btn-sm btn-secondary">
                        <FileText size={16} />
                        <span>Export Report</span>
                    </button>
                    <button
                        onClick={() => setSideEffectOpen(!sideEffectOpen)}
                        className="btn btn-sm btn-primary"
                    >
                        <AlertTriangle size={16} />
                        <span>Log Side Effect</span>
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                    label="Today's Progress"
                    value={`${completedToday} of ${totalToday}`}
                    subtitle={`${completionRate}% complete`}
                    icon={<Pill size={20} className="text-primary-400" />}
                    iconBgColor="bg-primary/20"
                    accentColor="var(--primary)"
                />
                <StatCard
                    label="Weekly Adherence"
                    value="94%"
                    subtitle="Excellent consistency"
                    icon={<TrendingUp size={20} className="text-success-light" />}
                    iconBgColor="bg-success-bg"
                    trend={{ value: 2, direction: 'up', label: 'vs last week' }}
                    accentColor="var(--success)"
                />
                <StatCard
                    label="Next Dose"
                    value={pendingMeds[0]?.time || 'Done!'}
                    subtitle={pendingMeds[0] ? `${pendingMeds[0].name} ${pendingMeds[0].dosage}` : 'All medications taken'}
                    icon={<Clock size={20} className="text-warning-light" />}
                    iconBgColor="bg-warning-bg"
                    accentColor="var(--warning)"
                />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Medication Schedule */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Today's Schedule Card */}
                    <div className="glass-panel p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Today's Schedule</h2>
                            <span className="text-sm text-text-muted">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                            </span>
                        </div>

                        {/* Pending Medications */}
                        {pendingMeds.length > 0 && (
                            <div className="space-y-3 mb-4">
                                <p className="text-xs text-text-muted uppercase tracking-wider">Upcoming</p>
                                {pendingMeds.map((med) => (
                                    <motion.div
                                        key={med.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="action-card p-4"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2.5 rounded-xl bg-primary/20">
                                                    <Pill size={20} className="text-primary-400" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold text-white">{med.name}</h3>
                                                        <span className="text-sm text-text-secondary">{med.dosage}</span>
                                                    </div>
                                                    <p className="text-sm text-text-muted">{med.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setExpandedMed(expandedMed === med.id ? null : med.id)}
                                                    className="p-2 text-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                >
                                                    {expandedMed === med.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                                </button>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => toggleTaken(med.id)}
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    <CheckCircle size={16} />
                                                    <span>Mark Taken</span>
                                                </motion.button>
                                            </div>
                                        </div>
                                        <AnimatePresence>
                                            {expandedMed === med.id && med.notes && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2 text-sm text-text-secondary">
                                                        <Info size={14} />
                                                        <span>{med.notes}</span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Taken Medications */}
                        {takenMeds.length > 0 && (
                            <div className="space-y-3">
                                <p className="text-xs text-text-muted uppercase tracking-wider">Completed</p>
                                {takenMeds.map((med) => (
                                    <motion.div
                                        key={med.id}
                                        layout
                                        className="p-4 rounded-xl bg-success-bg/30 border border-success/20"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2.5 rounded-xl bg-success/20">
                                                    <CheckCircle size={20} className="text-success-light" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-medium text-text-secondary line-through">{med.name}</h3>
                                                        <span className="text-sm text-text-muted">{med.dosage}</span>
                                                    </div>
                                                    <p className="text-sm text-success-light">
                                                        Taken at {med.takenAt}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => toggleTaken(med.id)}
                                                className="text-xs text-text-muted hover:text-white transition-colors"
                                            >
                                                Undo
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Add Medication */}
                        <button className="w-full mt-4 p-3 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center gap-2 text-text-muted hover:text-white hover:border-white/20 transition-colors">
                            <Plus size={18} />
                            <span>Add Medication</span>
                        </button>
                    </div>

                    {/* Progress Overview */}
                    <div className="glass-panel p-5">
                        <h3 className="text-lg font-semibold mb-4">Today's Progress</h3>
                        <ProgressBar
                            value={completedToday}
                            max={totalToday}
                            variant="gradient"
                            size="lg"
                            showLabel
                            label={`${completedToday} of ${totalToday} doses taken`}
                        />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-5">
                    {/* Weekly Overview */}
                    <div className="glass-panel p-5">
                        <h3 className="text-lg font-semibold mb-4">Weekly Overview</h3>
                        <div className="flex items-end justify-between gap-2 h-20 mb-2">
                            {weeklyStats.map((stat) => (
                                <div key={stat.day} className="flex flex-col items-center gap-1 flex-1">
                                    <div
                                        className={`w-full max-w-[20px] rounded-t transition-all ${
                                            stat.completed === stat.total
                                                ? 'bg-success'
                                                : stat.completed > 0
                                                    ? 'bg-warning'
                                                    : 'bg-white/10'
                                        }`}
                                        style={{ height: `${Math.max((stat.completed / stat.total) * 50, 4)}px` }}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-text-muted">
                            {weeklyStats.map((stat) => (
                                <span key={stat.day} className="flex-1 text-center">{stat.day}</span>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5 flex justify-between text-sm">
                            <span className="text-text-secondary">Weekly Average</span>
                            <span className="text-white font-medium">94%</span>
                        </div>
                    </div>

                    {/* AI Insight */}
                    <InsightCard
                        insight={medicationInsight}
                        compact
                        onDismiss={() => console.log('Dismiss')}
                    />

                    {/* Side Effect Form */}
                    <AnimatePresence>
                        {sideEffectOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="glass-panel p-5 overflow-hidden"
                            >
                                <h3 className="text-lg font-semibold mb-4 text-warning-light flex items-center gap-2">
                                    <AlertTriangle size={18} />
                                    Log Side Effect
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-text-secondary mb-3">
                                            Select symptoms (tap to set severity)
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {sideEffectOptions.map((option) => {
                                                const severity = selectedSymptoms[option.id] || 0;
                                                return (
                                                    <button
                                                        key={option.id}
                                                        onClick={() => handleSymptomToggle(option.id)}
                                                        className={`p-3 rounded-lg text-left transition-all ${severityColors[severity]} ${
                                                            severity > 0 ? 'border border-white/20' : 'border border-transparent hover:bg-white/10'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <span>{option.icon}</span>
                                                            <span className={severity > 0 ? 'text-white' : 'text-text-secondary'}>
                                                                {option.label}
                                                            </span>
                                                        </div>
                                                        {severity > 0 && (
                                                            <span className="text-xs text-text-muted mt-1 block">
                                                                {severityLabels[severity]}
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-text-secondary mb-2">
                                            Additional notes (optional)
                                        </label>
                                        <textarea
                                            value={reportNotes}
                                            onChange={(e) => setReportNotes(e.target.value)}
                                            className="input resize-none"
                                            rows={3}
                                            placeholder="Any additional observations..."
                                        />
                                    </div>

                                    <div className="flex justify-end gap-2 pt-2">
                                        <button
                                            onClick={() => setSideEffectOpen(false)}
                                            className="btn btn-sm btn-ghost"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSubmitReport}
                                            disabled={Object.keys(selectedSymptoms).length === 0 && !reportNotes.trim()}
                                            className="btn btn-sm btn-primary disabled:opacity-50"
                                        >
                                            Submit Report
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
