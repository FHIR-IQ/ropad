import { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { Smartphone, Lock, Clock, Shield, Wifi, WifiOff, Eye, Settings, Moon, Sun, MessageSquare, Monitor } from 'lucide-react';
import { StatCard, AlertBanner, ProgressBar, InsightCard } from '../components/ui';
import type { BehavioralInsight } from '../types';

const usageData = [
    { name: 'Roblox', hours: 1.5, color: '#d946ef', category: 'Gaming' },
    { name: 'YouTube', hours: 1.2, color: '#ef4444', category: 'Video' },
    { name: 'Minecraft', hours: 0.8, color: '#22c55e', category: 'Gaming' },
    { name: 'TikTok', hours: 0.5, color: '#64748b', category: 'Social' },
    { name: 'Khan Academy', hours: 1.0, color: '#3b82f6', category: 'Education' },
];

const weeklyTrendData = [
    { day: 'Mon', hours: 3.2 },
    { day: 'Tue', hours: 4.1 },
    { day: 'Wed', hours: 2.8 },
    { day: 'Thu', hours: 3.5 },
    { day: 'Fri', hours: 4.2 },
    { day: 'Sat', hours: 5.1 },
    { day: 'Sun', hours: 4.8 },
];

const connectedDevices = [
    { id: 1, name: "Leo's iPad", status: 'online' as const, currentApp: 'Minecraft', sessionMinutes: 23, screenTime: '2h 15m' },
    { id: 2, name: "Leo's iPhone", status: 'offline' as const, lastActive: '2 hours ago', screenTime: '45m' },
];

const recentBlocks = [
    { id: 1, time: '10:23 AM', reason: 'Inappropriate ad blocked', app: 'YouTube' },
    { id: 2, time: '9:15 AM', reason: 'Chat spam filter', app: 'Roblox' },
    { id: 3, time: 'Yesterday', reason: 'Age-restricted content', app: 'TikTok' },
];

const screenTimeInsight: BehavioralInsight = {
    id: 'screen-insight-1',
    type: 'suggestion',
    category: 'screen_time',
    evidenceLevel: 'moderate',
    title: 'Screen Time Pattern Detected',
    description: "Leo's focus is better on days with less than 3 hours of screen time. Consider setting a 3-hour weekday limit.",
    actionableSteps: [
        'Set weekday limit to 3 hours',
        'Encourage outdoor activities after school',
    ],
    generatedAt: new Date(),
    dismissed: false,
    actedOn: false,
};

export default function DeviceMonitor() {
    const [limits, setLimits] = useState(() => {
        const saved = localStorage.getItem('device_limits');
        return saved ? JSON.parse(saved) : { gaming: 2, social: 1, education: 3, total: 4 };
    });

    const [bedtimeMode, setBedtimeMode] = useState(true);
    const [schoolHoursBlock, setSchoolHoursBlock] = useState(true);
    const [showBlockDetails, setShowBlockDetails] = useState(false);

    useEffect(() => {
        localStorage.setItem('device_limits', JSON.stringify(limits));
    }, [limits]);

    const totalScreenTime = usageData.reduce((acc, app) => acc + app.hours, 0);
    const gamingTime = usageData.filter(a => a.category === 'Gaming').reduce((acc, app) => acc + app.hours, 0);
    const educationTime = usageData.filter(a => a.category === 'Education').reduce((acc, app) => acc + app.hours, 0);
    const screenTimePercent = Math.round((totalScreenTime / limits.total) * 100);

    const activeDevice = connectedDevices.find(d => d.status === 'online');

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="heading-md text-gradient">Digital Wellness</h1>
                    <p className="text-secondary">Monitor screen time and set healthy boundaries.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn btn-sm btn-secondary">
                        <Eye size={16} />
                        <span>Live View</span>
                    </button>
                    <button className="btn btn-sm btn-secondary">
                        <Settings size={16} />
                        <span>Settings</span>
                    </button>
                    <button className="btn btn-sm btn-danger">
                        <Lock size={16} />
                        <span>Lock All</span>
                    </button>
                </div>
            </div>

            {/* Active Device Status */}
            {activeDevice && (
                <AlertBanner
                    type="info"
                    title={`${activeDevice.name} is active`}
                    description={`Currently using ${activeDevice.currentApp} • Session: ${activeDevice.sessionMinutes} minutes`}
                    actionLabel="View Screen"
                    onAction={() => console.log('View screen')}
                />
            )}

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Total Today"
                    value={`${totalScreenTime.toFixed(1)}h`}
                    subtitle={`${screenTimePercent}% of ${limits.total}h limit`}
                    icon={<Clock size={20} className="text-accent-400" />}
                    iconBgColor="bg-accent/20"
                    accentColor={screenTimePercent > 80 ? 'var(--warning)' : undefined}
                />
                <StatCard
                    label="Gaming"
                    value={`${gamingTime.toFixed(1)}h`}
                    subtitle={`of ${limits.gaming}h limit`}
                    icon={<Monitor size={20} className="text-accent-400" />}
                    iconBgColor="bg-accent/20"
                    trend={gamingTime > limits.gaming * 0.9 ? { value: 15, direction: 'up', label: 'near limit' } : undefined}
                />
                <StatCard
                    label="Education"
                    value={`${educationTime.toFixed(1)}h`}
                    subtitle="Great progress!"
                    icon={<Smartphone size={20} className="text-info-light" />}
                    iconBgColor="bg-info-bg"
                    accentColor="var(--info)"
                />
                <StatCard
                    label="Content Blocked"
                    value="3"
                    subtitle="Today"
                    icon={<Shield size={20} className="text-error-light" />}
                    iconBgColor="bg-error-bg"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Left Column - Charts */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Real-time Device Status */}
                    <div className="glass-panel p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Connected Devices</h3>
                            <span className="text-xs text-text-muted">{connectedDevices.filter(d => d.status === 'online').length} online</span>
                        </div>
                        <div className="space-y-3">
                            {connectedDevices.map((device) => (
                                <div
                                    key={device.id}
                                    className={`p-4 rounded-xl border transition-all ${
                                        device.status === 'online'
                                            ? 'bg-success-bg/30 border-success/30'
                                            : 'bg-white/5 border-white/5'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2.5 rounded-xl ${device.status === 'online' ? 'bg-success/20' : 'bg-white/10'}`}>
                                                {device.status === 'online' ? (
                                                    <Wifi size={20} className="text-success-light" />
                                                ) : (
                                                    <WifiOff size={20} className="text-text-muted" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium text-white">{device.name}</p>
                                                    {device.status === 'online' && (
                                                        <span className="status-dot online" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-text-muted">
                                                    {device.status === 'online'
                                                        ? `Using ${device.currentApp} • ${device.sessionMinutes}m session`
                                                        : `Last active ${device.lastActive}`
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium text-text-secondary">{device.screenTime}</span>
                                            {device.status === 'online' && (
                                                <div className="flex gap-2">
                                                    <button className="btn btn-sm btn-ghost" title="Send Message">
                                                        <MessageSquare size={16} />
                                                    </button>
                                                    <button className="btn btn-sm btn-secondary" title="Lock Device">
                                                        <Lock size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* App Usage Breakdown */}
                    <div className="glass-panel p-5">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
                            <h3 className="text-lg font-semibold">App Usage Today</h3>
                            <div className="flex items-center gap-2">
                                <button className="btn btn-sm btn-secondary">Today</button>
                                <button className="btn btn-sm btn-ghost">Week</button>
                            </div>
                        </div>
                        <div className="h-[240px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={usageData} layout="vertical" margin={{ left: 10 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#94a3b8', fontSize: 13 }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#12142d', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                        cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                                        formatter={(value: number) => [`${value}h`, 'Time']}
                                    />
                                    <Bar dataKey="hours" radius={[0, 8, 8, 0]} barSize={24}>
                                        {usageData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/5">
                            {[
                                { label: 'Gaming', color: '#d946ef' },
                                { label: 'Video', color: '#ef4444' },
                                { label: 'Education', color: '#3b82f6' },
                                { label: 'Social', color: '#64748b' },
                            ].map((cat) => (
                                <div key={cat.label} className="flex items-center gap-2 text-xs text-text-secondary">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                                    <span>{cat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Weekly Trend */}
                    <div className="glass-panel p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Weekly Trend</h3>
                            <span className="text-sm text-text-muted">Avg: 3.9h/day</span>
                        </div>
                        <div className="h-[180px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={weeklyTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} unit="h" domain={[0, 6]} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#12142d', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Line type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Right Column - Controls */}
                <div className="space-y-5">
                    {/* Smart Limits */}
                    <div className="glass-panel p-5">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Lock size={18} className="text-accent-400" />
                            Daily Limits
                        </h3>

                        <div className="space-y-5">
                            {[
                                { key: 'gaming', label: 'Gaming', max: 4, color: 'accent' },
                                { key: 'social', label: 'Social Media', max: 2, color: 'warning' },
                                { key: 'education', label: 'Education', max: 5, color: 'success' },
                            ].map((item) => (
                                <div key={item.key}>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium text-text-secondary">{item.label}</label>
                                        <span className={`text-sm font-semibold text-${item.color}-light`}>
                                            {limits[item.key]}h
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max={item.max}
                                        step="0.5"
                                        value={limits[item.key]}
                                        onChange={(e) => setLimits({ ...limits, [item.key]: parseFloat(e.target.value) })}
                                        className="w-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Schedule Controls */}
                    <div className="glass-panel p-5">
                        <h3 className="text-lg font-semibold mb-4">Schedules</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                                <div className="flex items-center gap-3">
                                    <Moon size={18} className="text-primary-400" />
                                    <div>
                                        <p className="text-sm font-medium text-white">Bedtime Mode</p>
                                        <p className="text-xs text-text-muted">8:30 PM - 7:00 AM</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setBedtimeMode(!bedtimeMode)}
                                    className={`w-12 h-6 rounded-full transition-colors ${bedtimeMode ? 'bg-primary' : 'bg-white/20'}`}
                                >
                                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${bedtimeMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                                <div className="flex items-center gap-3">
                                    <Sun size={18} className="text-warning-light" />
                                    <div>
                                        <p className="text-sm font-medium text-white">School Hours</p>
                                        <p className="text-xs text-text-muted">8 AM - 3 PM weekdays</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSchoolHoursBlock(!schoolHoursBlock)}
                                    className={`w-12 h-6 rounded-full transition-colors ${schoolHoursBlock ? 'bg-primary' : 'bg-white/20'}`}
                                >
                                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${schoolHoursBlock ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Safety */}
                    <div className="glass-panel p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Shield size={18} className="text-error-light" />
                                Content Safety
                            </h3>
                            <button
                                onClick={() => setShowBlockDetails(!showBlockDetails)}
                                className="text-xs text-primary hover:text-primary-400"
                            >
                                {showBlockDetails ? 'Hide' : 'Details'}
                            </button>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-text-secondary">Blocked Today</span>
                            <span className="text-lg font-semibold text-white">3</span>
                        </div>
                        <ProgressBar value={3} max={10} variant="error" size="sm" />

                        {showBlockDetails && (
                            <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                                {recentBlocks.map((block) => (
                                    <div key={block.id} className="flex items-center justify-between text-sm">
                                        <div>
                                            <p className="text-text-secondary">{block.reason}</p>
                                            <p className="text-xs text-text-muted">{block.app} • {block.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* AI Insight */}
                    <InsightCard
                        insight={screenTimeInsight}
                        compact
                        onDismiss={() => console.log('Dismiss')}
                    />
                </div>
            </div>
        </div>
    );
}
