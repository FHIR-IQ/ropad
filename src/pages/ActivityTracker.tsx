import { useState } from 'react';
import { MapPin, Calendar, Star, Users, Plus, Clock, Trophy, TrendingUp, ChevronRight, Bike, Palette, BookOpen, Gamepad2 } from 'lucide-react';
import { StatCard, InsightCard, ProgressBar } from '../components/ui';
import type { BehavioralInsight } from '../types';

interface Activity {
    id: number;
    title: string;
    time: string;
    location: string;
    type: 'Sport' | 'Creative' | 'Educational' | 'Social';
    attendees: number;
    date: { month: string; day: string };
    duration?: number;
    completed?: boolean;
}

const activities: Activity[] = [
    {
        id: 1,
        title: 'Soccer Practice',
        time: 'Today, 4:00 PM',
        location: 'Central Park Fields',
        type: 'Sport',
        attendees: 12,
        date: { month: 'DEC', day: '7' },
        duration: 90,
    },
    {
        id: 2,
        title: 'Swimming Class',
        time: 'Saturday, 10:00 AM',
        location: 'City Aquatic Center',
        type: 'Sport',
        attendees: 6,
        date: { month: 'DEC', day: '8' },
        duration: 60,
    },
    {
        id: 3,
        title: 'Art Class',
        time: 'Sunday, 2:00 PM',
        location: 'Community Center',
        type: 'Creative',
        attendees: 8,
        date: { month: 'DEC', day: '9' },
        duration: 45,
    },
    {
        id: 4,
        title: 'Science Club',
        time: 'Monday, 3:30 PM',
        location: 'Lincoln Elementary',
        type: 'Educational',
        attendees: 10,
        date: { month: 'DEC', day: '10' },
        duration: 60,
    }
];

const recommendations = [
    {
        id: 1,
        title: 'Family Hiking Trail',
        description: 'A moderate 2-mile trail perfect for kids. Great for burning energy!',
        distance: '2.5 miles away',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=300',
        category: 'Outdoor'
    },
    {
        id: 2,
        title: 'Science Museum Workshop',
        description: 'Interactive robotics workshop for ages 8-12.',
        distance: '5 miles away',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=300',
        category: 'Educational'
    },
    {
        id: 3,
        title: 'Indoor Climbing Center',
        description: 'Safe bouldering walls for beginners and intermediates.',
        distance: '3 miles away',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=300',
        category: 'Sport'
    }
];

const weeklyStats = {
    totalHours: 8.5,
    activitiesCompleted: 5,
    streak: 3,
    goalHours: 10
};

const activityInsight: BehavioralInsight = {
    id: 'activity-insight-1',
    type: 'pattern',
    category: 'behavior',
    evidenceLevel: 'high',
    title: 'Physical Activity Improves Focus',
    description: "Leo's focus scores are 31% higher on days with 60+ minutes of physical activity. Morning activities show the strongest correlation with afternoon focus.",
    actionableSteps: [
        'Schedule activities before homework time',
        'Consider morning weekend activities',
        'Mix high-energy sports with calming creative time'
    ],
    generatedAt: new Date(),
    dismissed: false,
    actedOn: false,
};

const categoryColors = {
    Sport: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400', icon: Bike },
    Creative: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', icon: Palette },
    Educational: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', icon: BookOpen },
    Social: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', icon: Gamepad2 },
};

export default function ActivityTracker() {
    const [selectedFilter, setSelectedFilter] = useState<string>('all');

    const filteredActivities = selectedFilter === 'all'
        ? activities
        : activities.filter(a => a.type.toLowerCase() === selectedFilter);

    const progressPercent = Math.round((weeklyStats.totalHours / weeklyStats.goalHours) * 100);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="heading-md text-gradient">Activity Hub</h1>
                    <p className="text-secondary">Track physical activities and discover local fun.</p>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="bg-surface-secondary border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
                    >
                        <option value="all">All Types</option>
                        <option value="sport">Sports</option>
                        <option value="creative">Creative</option>
                        <option value="educational">Educational</option>
                        <option value="social">Social</option>
                    </select>
                    <button className="btn btn-primary flex items-center gap-2">
                        <Plus size={18} />
                        <span>Schedule Activity</span>
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="This Week"
                    value={`${weeklyStats.totalHours}h`}
                    subtitle={`of ${weeklyStats.goalHours}h goal`}
                    icon={<Clock size={20} className="text-primary-400" />}
                    iconBgColor="bg-primary/20"
                    trend={{ value: 2, direction: 'up', label: 'from last week' }}
                    accentColor="var(--primary)"
                />
                <StatCard
                    label="Activities"
                    value={weeklyStats.activitiesCompleted.toString()}
                    subtitle="completed this week"
                    icon={<Calendar size={20} className="text-accent-400" />}
                    iconBgColor="bg-accent/20"
                    accentColor="var(--accent)"
                />
                <StatCard
                    label="Active Streak"
                    value={`${weeklyStats.streak} days`}
                    subtitle="Keep it up!"
                    icon={<Trophy size={20} className="text-yellow-400" />}
                    iconBgColor="bg-yellow-500/20"
                    trend={{ value: 1, direction: 'up' }}
                    accentColor="#eab308"
                />
                <div className="glass-panel p-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-text-secondary">Weekly Goal Progress</span>
                        <TrendingUp size={18} className="text-success" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">{progressPercent}%</div>
                    <ProgressBar value={progressPercent} variant="gradient" size="md" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Upcoming Schedule */}
                <div className="lg:col-span-2 space-y-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Upcoming Schedule</h2>
                        <button className="text-sm text-primary hover:text-primary-400 flex items-center gap-1">
                            View Calendar <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {filteredActivities.map((activity) => {
                            const categoryStyle = categoryColors[activity.type];
                            const CategoryIcon = categoryStyle.icon;

                            return (
                                <div key={activity.id} className="glass-panel p-4 flex items-start gap-4 hover:border-white/20 transition-all cursor-pointer group">
                                    <div className="bg-primary/20 p-3 rounded-xl text-primary font-bold text-center min-w-[56px]">
                                        <div className="text-xs uppercase tracking-wide">{activity.date.month}</div>
                                        <div className="text-xl">{activity.date.day}</div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-semibold truncate">{activity.title}</h3>
                                            <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${categoryStyle.bg} ${categoryStyle.border} ${categoryStyle.text} border`}>
                                                <CategoryIcon size={12} />
                                                {activity.type}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary mt-2">
                                            <span className="flex items-center gap-1"><Clock size={14} /> {activity.time}</span>
                                            <span className="flex items-center gap-1 truncate"><MapPin size={14} /> {activity.location}</span>
                                            {activity.duration && (
                                                <span className="text-text-muted">{activity.duration} min</span>
                                            )}
                                        </div>
                                        <div className="mt-2 flex items-center gap-3 text-xs text-text-muted">
                                            <span className="flex items-center gap-1"><Users size={12} /> {activity.attendees} attending</span>
                                        </div>
                                    </div>
                                    <button className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-white/10 text-text-muted hover:text-white transition-all">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <button className="w-full glass-card p-4 border-dashed border-2 border-white/10 flex items-center justify-center gap-2 text-text-muted hover:text-white hover:border-primary/50 transition-colors">
                        <Plus size={20} />
                        <span>Add Activity</span>
                    </button>

                    {/* AI Insight */}
                    <InsightCard
                        insight={activityInsight}
                        onLearnMore={() => console.log('Learn more')}
                        onDismiss={() => console.log('Dismiss')}
                    />
                </div>

                {/* Local Recommendations */}
                <div className="space-y-5">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Recommended</h2>
                        <span className="text-xs text-accent border border-accent/30 rounded-full px-2 py-1 bg-accent/5">AI Curated</span>
                    </div>

                    <div className="space-y-3">
                        {recommendations.map((rec) => (
                            <div key={rec.id} className="glass-card group cursor-pointer overflow-hidden rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all">
                                <div className="relative h-24 w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                                    <img src={rec.image} alt={rec.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-80" />
                                    <div className="absolute top-2 left-2 z-20">
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white/90">{rec.category}</span>
                                    </div>
                                    <div className="absolute bottom-2 left-2 right-2 z-20">
                                        <h3 className="font-semibold text-white text-sm truncate">{rec.title}</h3>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <p className="text-xs text-text-secondary mb-2 line-clamp-2">{rec.description}</p>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="flex items-center gap-1 text-yellow-400 font-medium"><Star size={12} fill="currentColor" /> {rec.rating}</span>
                                        <span className="text-text-muted flex items-center gap-1"><MapPin size={12} /> {rec.distance}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full text-center text-sm text-primary hover:text-primary-400 py-2 transition-colors">
                        View More Recommendations
                    </button>
                </div>
            </div>
        </div>
    );
}
