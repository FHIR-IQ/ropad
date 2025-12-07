import { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Smartphone, Lock, AlertTriangle } from 'lucide-react';

const usageData = [
    { name: 'Roblox', hours: 1.5, color: '#d946ef' },
    { name: 'YouTube', hours: 1.2, color: '#ef4444' },
    { name: 'Minecraft', hours: 0.8, color: '#22c55e' },
    { name: 'TikTok', hours: 0.5, color: '#000000' }, // Dark theme mock
    { name: 'Education', hours: 1.0, color: '#3b82f6' },
];

export default function DeviceMonitor() {
    const [limits, setLimits] = useState(() => {
        const saved = localStorage.getItem('device_limits');
        return saved ? JSON.parse(saved) : { gaming: 2, social: 1 };
    });

    useEffect(() => {
        localStorage.setItem('device_limits', JSON.stringify(limits));
    }, [limits]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="heading-md text-gradient">Device Monitor</h1>
                    <p className="text-secondary">Track screen time and set healthy boundaries.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Usage Chart */}
                <div className="lg:col-span-2 glass-panel p-6">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <Smartphone size={20} />
                        App Usage Breakdown (Today)
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={usageData} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#fff' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#12142d', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Bar dataKey="hours" radius={[0, 4, 4, 0]} barSize={32}>
                                    {usageData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Limits & Controls */}
                <div className="space-y-6">
                    <div className="glass-panel p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Lock size={20} className="text-accent" />
                            Daily Limits
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium">Gaming (Roblox, Minecraft)</label>
                                    <span className="text-sm text-accent">{limits.gaming}h limit</span>
                                </div>
                                <input
                                    type="range"
                                    min="0" max="4" step="0.5"
                                    value={limits.gaming}
                                    onChange={(e) => setLimits({ ...limits, gaming: parseFloat(e.target.value) })}
                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium">Social Video</label>
                                    <span className="text-sm text-accent">{limits.social}h limit</span>
                                </div>
                                <input
                                    type="range"
                                    min="0" max="2" step="0.25"
                                    value={limits.social}
                                    onChange={(e) => setLimits({ ...limits, social: parseFloat(e.target.value) })}
                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                                />
                            </div>
                        </div>

                        <button className="w-full mt-6 btn-ghost border border-white/10 hover:border-white/30 text-sm">
                            Apply Changes
                        </button>
                    </div>

                    <div className="glass-panel p-6 border-l-4 border-blue-500 bg-blue-500/5">
                        <h3 className="text-lg font-semibold mb-2 text-white flex items-center gap-2">
                            <AlertTriangle size={20} className="text-blue-500" />
                            Balance Alert
                        </h3>
                        <p className="text-sm text-text-secondary mb-3">
                            High screen time detected on Minecraft this week.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
                            <span>AI Suggestion:</span>
                            <span className="text-text-secondary">Try "Lego Building" for offline fun.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
