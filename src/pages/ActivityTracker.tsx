import { MapPin, Calendar, Star, Users, Plus, Clock, Trophy, TrendingUp, Filter } from 'lucide-react';

const activities = [
    {
        id: 1,
        title: 'Soccer Practice',
        time: 'Today, 4:00 PM',
        location: 'Central Park Fields',
        type: 'Sport',
        attendees: 12,
        date: { month: 'DEC', day: '6' }
    },
    {
        id: 2,
        title: 'Swimming Class',
        time: 'Saturday, 10:00 AM',
        location: 'City Aquatic Center',
        type: 'Sport',
        attendees: 6,
        date: { month: 'DEC', day: '7' }
    },
    {
        id: 3,
        title: 'Art Class',
        time: 'Sunday, 2:00 PM',
        location: 'Community Center',
        type: 'Creative',
        attendees: 8,
        date: { month: 'DEC', day: '8' }
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
    streak: 3
};

export default function ActivityTracker() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="heading-md text-gradient">Activities & Sports</h1>
                    <p className="text-secondary">Track physical activities and discover local fun.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-ghost flex items-center gap-2 text-sm border border-white/10">
                        <Filter size={16} />
                        <span>Filter</span>
                    </button>
                    <button className="btn-primary flex items-center gap-2">
                        <Plus size={18} />
                        <span>Schedule Activity</span>
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-text-secondary">This Week</span>
                        <Clock size={18} className="text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-white">{weeklyStats.totalHours}h</div>
                    <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                        <TrendingUp size={12} /> +2h from last week
                    </p>
                </div>
                <div className="glass-panel p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-text-secondary">Activities</span>
                        <Calendar size={18} className="text-accent" />
                    </div>
                    <div className="text-2xl font-bold text-white">{weeklyStats.activitiesCompleted}</div>
                    <p className="text-xs text-text-muted mt-1">completed this week</p>
                </div>
                <div className="glass-panel p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-text-secondary">Active Streak</span>
                        <Trophy size={18} className="text-yellow-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{weeklyStats.streak} days</div>
                    <p className="text-xs text-yellow-400 mt-1">Keep it up!</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Upcoming Schedule */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Upcoming Schedule</h2>
                        <button className="text-sm text-primary hover:underline">View Calendar</button>
                    </div>
                    <div className="space-y-4">
                        {activities.map((activity) => (
                            <div key={activity.id} className="glass-panel p-5 flex items-start gap-4 hover:border-white/20 transition-colors cursor-pointer">
                                <div className="bg-primary/20 p-3 rounded-xl text-primary font-bold text-center min-w-[60px]">
                                    <div className="text-xs uppercase">{activity.date.month}</div>
                                    <div className="text-xl">{activity.date.day}</div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold truncate">{activity.title}</h3>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary mt-2">
                                        <span className="flex items-center gap-1"><Clock size={14} /> {activity.time}</span>
                                        <span className="flex items-center gap-1 truncate"><MapPin size={14} /> {activity.location}</span>
                                    </div>
                                    <div className="mt-3 flex items-center gap-2 text-xs">
                                        <span className={`px-2 py-1 rounded-full border ${
                                            activity.type === 'Sport' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                            activity.type === 'Creative' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
                                            'bg-white/5 border-white/10 text-text-secondary'
                                        }`}>{activity.type}</span>
                                        <span className="flex items-center gap-1 text-text-muted"><Users size={12} /> {activity.attendees} attending</span>
                                    </div>
                                </div>
                                <button className="p-2 rounded-lg hover:bg-white/10 text-text-muted hover:text-white transition-colors">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    <button className="w-full glass-card p-4 border-dashed border-2 border-white/10 flex items-center justify-center gap-2 text-text-muted hover:text-white hover:border-white/20 transition-colors">
                        <Plus size={20} />
                        <span>Add Activity</span>
                    </button>
                </div>

                {/* Local Recommendations */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Recommended</h2>
                        <span className="text-xs text-accent border border-accent/30 rounded-full px-2 py-1 bg-accent/5">AI Curated</span>
                    </div>

                    <div className="space-y-4">
                        {recommendations.map((rec) => (
                            <div key={rec.id} className="glass-card group cursor-pointer overflow-hidden rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all">
                                <div className="relative h-28 w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                                    <img src={rec.image} alt={rec.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-80" />
                                    <div className="absolute top-3 left-3 z-20">
                                        <span className="text-xs px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white/90">{rec.category}</span>
                                    </div>
                                    <div className="absolute bottom-3 left-3 right-3 z-20">
                                        <h3 className="font-bold text-white text-base truncate">{rec.title}</h3>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-text-secondary mb-3 line-clamp-2">{rec.description}</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="flex items-center gap-1 text-yellow-400 font-medium"><Star size={14} fill="currentColor" /> {rec.rating}</span>
                                        <span className="text-text-muted flex items-center gap-1"><MapPin size={14} /> {rec.distance}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full text-center text-sm text-primary hover:underline py-2">
                        View More Recommendations
                    </button>
                </div>
            </div>
        </div>
    );
}
