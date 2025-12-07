import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock, AlertTriangle, Zap, Target, Calendar } from 'lucide-react';

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

const recentActivities = [
    { id: 1, action: 'Medication taken', time: '8:00 AM', icon: '💊', status: 'success' },
    { id: 2, action: 'Screen limit reached', time: '11:30 AM', icon: '📱', status: 'warning' },
    { id: 3, action: 'Soccer practice reminder', time: '3:30 PM', icon: '⚽', status: 'info' },
];

export default function Dashboard() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="heading-md text-gradient">Dashboard Overview</h1>
                    <p className="text-secondary">Welcome back, Sarah. Here's how Leo is doing today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-text-muted">Today</span>
                    <button className="btn-ghost flex items-center gap-2 text-sm border border-white/10">
                        <Calendar size={16} />
                        <span>Dec 6, 2024</span>
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                {/* Focus Streak Card */}
                <div className="glass-panel p-6 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border-l-4 border-indigo-500 hover:border-indigo-400 transition-colors">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-text-secondary mb-1">Focus Streak</h3>
                            <div className="text-3xl font-bold text-white mb-1">12<span className="text-lg text-text-secondary font-normal"> days</span></div>
                            <p className="text-text-muted text-sm">Consistent Routine</p>
                        </div>
                        <div className="p-3 rounded-xl bg-indigo-500/20">
                            <Zap size={24} className="text-indigo-400" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-lg w-fit">
                        <TrendingUp size={16} />
                        <span>Best streak this month!</span>
                    </div>
                </div>

                {/* Medication Card */}
                <div className="glass-panel p-6 relative overflow-hidden group hover:border-primary/30 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Clock size={120} />
                    </div>
                    <div className="flex items-start justify-between relative z-10">
                        <div>
                            <h3 className="text-sm font-medium text-text-secondary mb-1">Next Medication</h3>
                            <div className="text-3xl font-bold text-primary mb-1">2:00 PM</div>
                            <p className="text-text-muted text-sm">Ritalin 10mg</p>
                        </div>
                        <div className="p-3 rounded-xl bg-primary/20">
                            <Clock size={24} className="text-primary" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-yellow-400 bg-yellow-400/10 px-3 py-1.5 rounded-lg w-fit">
                        <span>Upcoming in 45m</span>
                    </div>
                </div>

                {/* Screen Time Card */}
                <div className="glass-panel p-6 hover:border-accent/30 transition-colors">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-text-secondary mb-1">Screen Time</h3>
                            <div className="text-3xl font-bold text-accent mb-1">2h 15m</div>
                            <p className="text-text-muted text-sm">Avg 3h 30m / day</p>
                        </div>
                        <div className="p-3 rounded-xl bg-accent/20">
                            <Target size={24} className="text-accent" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-green-400 bg-green-400/10 px-3 py-1.5 rounded-lg w-fit">
                        <TrendingUp size={16} />
                        <span>-12% vs last week</span>
                    </div>
                </div>

                {/* Recent Alert Card */}
                <div className="glass-panel p-6 border-l-4 border-l-red-500 hover:border-red-400 transition-colors">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-text-secondary mb-1">Recent Alert</h3>
                            <p className="text-white font-semibold mb-1">Content Blocked</p>
                            <p className="text-text-muted text-sm">Roblox chat filter triggered.</p>
                        </div>
                        <div className="p-3 rounded-xl bg-red-500/20">
                            <AlertTriangle size={24} className="text-red-400" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-text-muted">
                        <span>10:23 AM Today</span>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
                {/* Screen Time Chart - Takes 2 columns on lg */}
                <div className="lg:col-span-2 glass-panel p-5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h3 className="text-lg font-semibold">Weekly Screen Time Activity</h3>
                        <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-text-muted hover:text-white hover:bg-white/10 transition-colors">Day</button>
                            <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/20 text-primary">Week</button>
                            <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-text-muted hover:text-white hover:bg-white/10 transition-colors">Month</button>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
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

                {/* App Breakdown - Takes 1 column */}
                <div className="glass-panel p-5">
                    <h3 className="text-lg font-semibold mb-6">App Categories</h3>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={appBreakdownData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
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
                    <div className="space-y-2 mt-4">
                        {appBreakdownData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-text-secondary">{item.name}</span>
                                </div>
                                <span className="text-white font-medium">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Activity Feed */}
            <div className="glass-panel p-5">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Today's Activity</h3>
                    <button className="text-sm text-primary hover:underline">View All</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors">
                            <div className="text-2xl">{activity.icon}</div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-medium truncate">{activity.action}</p>
                                <p className="text-sm text-text-muted">{activity.time}</p>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${
                                activity.status === 'success' ? 'bg-green-500' :
                                activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                            }`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
