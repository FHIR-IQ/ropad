import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

const screenTimeData = [
    { name: 'Mon', hours: 2.5 },
    { name: 'Tue', hours: 3.8 },
    { name: 'Wed', hours: 1.5 },
    { name: 'Thu', hours: 4.2 },
    { name: 'Fri', hours: 3.0 },
    { name: 'Sat', hours: 5.5 },
    { name: 'Sun', hours: 4.0 },
];

export default function Dashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="heading-md text-gradient">Dashboard Overview</h1>
                    <p className="text-secondary">Welcome back, Sarah. Here's how Leo is doing today.</p>
                </div>
                <button className="glass-card p-3 rounded-full hover:bg-white/10 relative">
                    <Bell size={20} className="text-text-primary" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Focus Streak Card (NEW) */}
                <div className="glass-panel p-6 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border-l-4 border-indigo-500">
                    <h3 className="text-lg font-semibold mb-2">Focus Streak</h3>
                    <div className="text-3xl font-bold text-white mb-1">12<span className="text-lg text-text-secondary font-normal"> days</span></div>
                    <p className="text-text-secondary">Consistent Routine</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-lg w-fit">
                        <TrendingUp size={16} />
                        <span>Best streak this month!</span>
                    </div>
                </div>

                {/* Medication Card */}
                <div className="glass-panel p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Clock size={100} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Next Medication</h3>
                    <div className="text-3xl font-bold text-primary mb-1">2:00 PM</div>
                    <p className="text-text-secondary">Ritalin 10mg</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-lg w-fit">
                        <span>Upcoming in 45m</span>
                    </div>
                </div>

                {/* Screen Time Card */}
                <div className="glass-panel p-6">
                    <h3 className="text-lg font-semibold mb-2">Screen Time</h3>
                    <div className="text-3xl font-bold text-accent mb-1">2h 15m</div>
                    <p className="text-text-secondary">Avg 3h 30m / day</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-green-400 bg-green-400/10 px-3 py-1 rounded-lg w-fit">
                        <TrendingUp size={16} />
                        <span>-12% vs last week</span>
                    </div>
                </div>

                {/* Recent Alert Card */}
                <div className="glass-panel p-6 border-l-4 border-l-red-500">
                    <h3 className="text-lg font-semibold mb-2">Recent Alert</h3>
                    <p className="text-text-primary font-medium mb-1">Content Blocked</p>
                    <p className="text-text-secondary text-sm">Roblox chat filter triggered.</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-text-muted">
                        <AlertTriangle size={16} />
                        <span>10:23 AM Today</span>
                    </div>
                </div>
            </div>

            {/* Screen Time Chart */}
            <div className="glass-panel p-6">
                <h3 className="text-lg font-semibold mb-6">Weekly Screen Time Activity</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={screenTimeData}>
                            <defs>
                                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                            <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                            <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} unit="h" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#12142d', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="hours" stroke="#d946ef" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
