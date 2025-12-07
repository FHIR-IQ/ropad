import { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { Smartphone, Lock, AlertTriangle, Clock, Shield, Wifi, WifiOff, Eye } from 'lucide-react';

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
    { id: 1, name: "Leo's iPad", status: 'online', lastActive: 'Now', screenTime: '2h 15m' },
    { id: 2, name: "Leo's iPhone", status: 'offline', lastActive: '2 hours ago', screenTime: '45m' },
];

export default function DeviceMonitor() {
    const [limits, setLimits] = useState(() => {
        const saved = localStorage.getItem('device_limits');
        return saved ? JSON.parse(saved) : { gaming: 2, social: 1, education: 3 };
    });

    useEffect(() => {
        localStorage.setItem('device_limits', JSON.stringify(limits));
    }, [limits]);

    const totalScreenTime = usageData.reduce((acc, app) => acc + app.hours, 0);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="heading-md text-gradient">Device Monitor</h1>
                    <p className="text-secondary">Track screen time and set healthy boundaries.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-ghost flex items-center gap-2 text-sm border border-white/10">
                        <Eye size={16} />
                        <span>Live View</span>
                    </button>
                    <button className="btn-primary flex items-center gap-2">
                        <Shield size={18} />
                        <span>Lock All Devices</span>
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass-panel p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-text-secondary">Total Today</span>
                        <Clock size={18} className="text-accent" />
                    </div>
                    <div className="text-2xl font-bold text-white">{totalScreenTime.toFixed(1)}h</div>
                    <p className="text-xs text-text-muted mt-1">of 4h limit</p>
                </div>
                <div className="glass-panel p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-text-secondary">Gaming</span>
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                    </div>
                    <div className="text-2xl font-bold text-white">2.3h</div>
                    <p className="text-xs text-yellow-400 mt-1">15m until limit</p>
                </div>
                <div className="glass-panel p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-text-secondary">Education</span>
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    </div>
                    <div className="text-2xl font-bold text-white">1.0h</div>
                    <p className="text-xs text-green-400 mt-1">Great progress!</p>
                </div>
                <div className="glass-panel p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-text-secondary">Blocks Today</span>
                        <Shield size={18} className="text-red-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">3</div>
                    <p className="text-xs text-text-muted mt-1">content filtered</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Usage Chart */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="glass-panel p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Smartphone size={20} />
                                App Usage Breakdown
                            </h3>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/20 text-primary">Today</button>
                                <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-text-muted hover:text-white hover:bg-white/10 transition-colors">Week</button>
                            </div>
                        </div>
                        <div className="h-[280px] w-full">
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
                                    <Bar dataKey="hours" radius={[0, 8, 8, 0]} barSize={28}>
                                        {usageData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Weekly Trend */}
                    <div className="glass-panel p-6">
                        <h3 className="text-lg font-semibold mb-6">Weekly Trend</h3>
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={weeklyTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} unit="h" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#12142d', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Line type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', strokeWidth: 2 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Connected Devices */}
                    <div className="glass-panel p-6">
                        <h3 className="text-lg font-semibold mb-4">Connected Devices</h3>
                        <div className="space-y-3">
                            {connectedDevices.map((device) => (
                                <div key={device.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors">
                                    <div className="flex items-center gap-3">
                                        {device.status === 'online' ? (
                                            <div className="p-2 rounded-lg bg-green-500/20">
                                                <Wifi size={18} className="text-green-400" />
                                            </div>
                                        ) : (
                                            <div className="p-2 rounded-lg bg-white/10">
                                                <WifiOff size={18} className="text-text-muted" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-sm font-medium text-white">{device.name}</p>
                                            <p className="text-xs text-text-muted">{device.lastActive}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-text-secondary">{device.screenTime}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Limits & Controls */}
                    <div className="glass-panel p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Lock size={20} className="text-accent" />
                            Daily Limits
                        </h3>

                        <div className="space-y-5">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium">Gaming</label>
                                    <span className="text-sm text-accent font-medium">{limits.gaming}h</span>
                                </div>
                                <input
                                    type="range"
                                    min="0" max="4" step="0.5"
                                    value={limits.gaming}
                                    onChange={(e) => setLimits({ ...limits, gaming: parseFloat(e.target.value) })}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium">Social Media</label>
                                    <span className="text-sm text-accent font-medium">{limits.social}h</span>
                                </div>
                                <input
                                    type="range"
                                    min="0" max="2" step="0.25"
                                    value={limits.social}
                                    onChange={(e) => setLimits({ ...limits, social: parseFloat(e.target.value) })}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium">Education</label>
                                    <span className="text-sm text-green-400 font-medium">{limits.education}h</span>
                                </div>
                                <input
                                    type="range"
                                    min="0" max="5" step="0.5"
                                    value={limits.education}
                                    onChange={(e) => setLimits({ ...limits, education: parseFloat(e.target.value) })}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <button className="w-full mt-6 btn-primary text-sm">
                            Save Limits
                        </button>
                    </div>

                    {/* AI Suggestion */}
                    <div className="glass-panel p-6 border-l-4 border-blue-500 bg-gradient-to-br from-blue-500/10 to-indigo-500/5">
                        <h3 className="text-base font-semibold mb-2 text-white flex items-center gap-2">
                            <AlertTriangle size={18} className="text-blue-400" />
                            Balance Alert
                        </h3>
                        <p className="text-sm text-text-secondary mb-3">
                            High screen time detected on Minecraft this week.
                        </p>
                        <div className="p-3 rounded-lg bg-white/5">
                            <p className="text-xs text-blue-400 font-medium mb-1">AI Suggestion</p>
                            <p className="text-sm text-text-secondary">Try "Lego Building" for offline creative fun.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
