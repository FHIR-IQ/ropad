import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Zap, Target, Calendar, Pill, Activity, ChevronRight, Bot } from 'lucide-react';
import { StatCard, AlertBanner, ActionCard, InsightCard, Timeline, ProgressBar, RewardPanel } from '../components/ui';
import type { TimelineEvent, BehavioralInsight } from '../types';

// Mock Data
const screenTimeData = [
    { name: 'Mon', hours: 2.5 },
    { name: 'Tue', hours: 3.8 },
    { name: 'Wed', hours: 1.5 },
    { name: 'Thu', hours: 4.2 },
    { name: 'Fri', hours: 3.0 },
    { name: 'Sat', hours: 5.5 },
    { name: 'Sun', hours: 4.0 },
];

const appBreakdownData = [
    { name: 'Education', value: 35, color: '#3b82f6' },
    { name: 'Gaming', value: 30, color: '#d946ef' },
    { name: 'Social', value: 20, color: '#f59e0b' },
    { name: 'Other', value: 15, color: '#64748b' },
];

const todayTimeline: TimelineEvent[] = [
    { id: '1', timestamp: new Date('2024-12-07T08:00:00'), type: 'medication_taken', title: 'Medication taken', description: 'Ritalin 10mg', status: 'completed' },
    { id: '2', timestamp: new Date('2024-12-07T09:30:00'), type: 'activity_completed', title: 'School started', status: 'completed' },
    { id: '3', timestamp: new Date('2024-12-07T12:00:00'), type: 'medication_taken', title: 'Medication due', description: 'Ritalin 10mg', status: 'current' },
    { id: '4', timestamp: new Date('2024-12-07T15:30:00'), type: 'activity_completed', title: 'Soccer practice', description: 'Central Park Fields', status: 'upcoming' },
    { id: '5', timestamp: new Date('2024-12-07T18:00:00'), type: 'medication_taken', title: 'Evening medication', description: 'Ritalin 10mg', status: 'upcoming' },
];

const aiInsight: BehavioralInsight = {
    id: 'insight-1',
    type: 'pattern',
    category: 'medication',
    evidenceLevel: 'high',
    title: 'Medication Timing Correlation Found',
    description: "Leo's focus scores are 23% higher when medication is taken within 15 minutes of the scheduled time. Consistent timing helps maintain stable medication levels throughout the day.",
    actionableSteps: [
        'Set a phone alarm 5 minutes before medication time',
        'Prepare medication the night before',
        'Create a consistent morning routine'
    ],
    generatedAt: new Date(),
    dismissed: false,
    actedOn: false,
};

const priorityAlerts = [
    { id: '1', type: 'warning' as const, title: 'Medication due in 18 minutes', description: 'Ritalin 10mg - noon dose' },
    { id: '2', type: 'info' as const, title: 'Screen time at 56% of daily limit', description: '2h 15m used of 4h limit' },
];

export default function Dashboard() {
    const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="heading-md text-gradient">{greeting}, Sarah</h1>
                    <p className="text-secondary">Leo is having a great day so far.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn btn-sm btn-secondary">
                        <Calendar size={16} />
                        <span>{currentDate}</span>
                    </button>
                </div>
            </div>

            {/* Priority Alerts */}
            {priorityAlerts.filter(a => !dismissedAlerts.includes(a.id)).length > 0 && (
                <div className="space-y-2">
                    {priorityAlerts
                        .filter(a => !dismissedAlerts.includes(a.id))
                        .map(alert => (
                            <AlertBanner
                                key={alert.id}
                                type={alert.type}
                                title={alert.title}
                                description={alert.description}
                                actionLabel="Take Action"
                                onAction={() => console.log('Action:', alert.id)}
                                onDismiss={() => setDismissedAlerts([...dismissedAlerts, alert.id])}
                            />
                        ))}
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Focus Score"
                    value="87%"
                    subtitle="Based on routine adherence"
                    icon={<Zap size={20} className="text-primary-400" />}
                    iconBgColor="bg-primary/20"
                    trend={{ value: 5, direction: 'up', label: 'vs last week' }}
                    accentColor="var(--primary)"
                />
                <StatCard
                    label="Med Streak"
                    value="12 days"
                    subtitle="Consistent routine"
                    icon={<Pill size={20} className="text-success-light" />}
                    iconBgColor="bg-success-bg"
                    trend={{ value: 3, direction: 'up' }}
                    accentColor="var(--success)"
                />
                <StatCard
                    label="Screen Time"
                    value="2h 15m"
                    subtitle="of 4h daily limit"
                    icon={<Target size={20} className="text-accent-400" />}
                    iconBgColor="bg-accent/20"
                    trend={{ value: -12, direction: 'down', label: 'vs last week' }}
                />
                <StatCard
                    label="Activity"
                    value="45 min"
                    subtitle="Physical activity today"
                    icon={<Activity size={20} className="text-info-light" />}
                    iconBgColor="bg-info-bg"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Left Column - Timeline & Charts */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Today's Timeline */}
                    <div className="glass-panel p-5">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-semibold">Today's Timeline</h3>
                            <button className="text-sm text-primary hover:text-primary-400 flex items-center gap-1">
                                View Full Schedule <ChevronRight size={16} />
                            </button>
                        </div>
                        <Timeline events={todayTimeline} />
                    </div>

                    {/* Screen Time Chart */}
                    <div className="glass-panel p-5">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
                            <div>
                                <h3 className="text-lg font-semibold">Weekly Screen Time</h3>
                                <p className="text-sm text-text-muted">Avg 3.5h/day this week</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="btn btn-sm btn-ghost">Day</button>
                                <button className="btn btn-sm btn-secondary">Week</button>
                                <button className="btn btn-sm btn-ghost">Month</button>
                            </div>
                        </div>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={screenTimeData}>
                                    <defs>
                                        <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} unit="h" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#12142d', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                        labelStyle={{ color: '#94a3b8' }}
                                    />
                                    <Area type="monotone" dataKey="hours" stroke="#d946ef" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Right Column - Insights & Categories */}
                <div className="space-y-5">
                    {/* AI Insight */}
                    <InsightCard
                        insight={aiInsight}
                        onLearnMore={() => console.log('Learn more')}
                        onDismiss={() => console.log('Dismiss')}
                    />

                    {/* App Categories */}
                    <div className="glass-panel p-5">
                        <h3 className="text-lg font-semibold mb-4">App Categories</h3>
                        <div className="h-[160px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={appBreakdownData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={45}
                                        outerRadius={70}
                                        paddingAngle={4}
                                        dataKey="value"
                                    >
                                        {appBreakdownData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#12142d', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-2 mt-3">
                            {appBreakdownData.map((item) => (
                                <div key={item.name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-text-secondary">{item.name}</span>
                                    </div>
                                    <span className="text-white font-medium">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <ActionCard
                        title="Ask AI Guardian"
                        subtitle="Get personalized suggestions"
                        icon={<Bot size={20} className="text-primary-400" />}
                        actions={[
                            { label: 'Open Chat', onClick: () => window.location.href = '/guardian', variant: 'primary' }
                        ]}
                    />
                </div>
            </div>

            {/* Two-column bottom row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Progress Overview */}
                <div className="lg:col-span-2 glass-panel p-5">
                    <h3 className="text-lg font-semibold mb-4">Today's Progress</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-text-secondary">Medication Adherence</span>
                                <span className="text-sm font-medium text-success-light">2 of 3</span>
                            </div>
                            <ProgressBar value={66} variant="success" />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-text-secondary">Screen Time Limit</span>
                                <span className="text-sm font-medium text-accent-400">56%</span>
                            </div>
                            <ProgressBar value={56} variant="gradient" />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-text-secondary">Daily Activity Goal</span>
                                <span className="text-sm font-medium text-warning-light">45 of 60 min</span>
                            </div>
                            <ProgressBar value={75} variant="warning" />
                        </div>
                    </div>
                </div>

                {/* Reward System Panel */}
                <RewardPanel
                    currentTokens={145}
                    lifetimeTokensEarned={2340}
                    recentTransactions={[]}
                    earningRules={[]}
                    rewardMenu={[]}
                    onRedeemReward={(id) => console.log('Redeem:', id)}
                />
            </div>
        </div>
    );
}
