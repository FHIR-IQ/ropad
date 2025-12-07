import { MapPin, Calendar, Star, Users } from 'lucide-react';

const activities = [
    {
        id: 1,
        title: 'Soccer Practice',
        time: 'Today, 4:00 PM',
        location: 'Central Park Fields',
        type: 'Sport',
        attendees: 12
    },
    {
        id: 2,
        title: 'Swimming Class',
        time: 'Saturday, 10:00 AM',
        location: 'City Aquatic Center',
        type: 'Sport',
        attendees: 6
    }
];

const recommendations = [
    {
        id: 1,
        title: 'Family Hiking Trail',
        description: 'A moderate 2-mile trail perfect for kids. Great for burning energy!',
        distance: '2.5 miles away',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=300'
    },
    {
        id: 2,
        title: 'Science Museum Workshop',
        description: 'Interactive robotics workshop for ages 8-12.',
        distance: '5 miles away',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=300'
    }
];

export default function ActivityTracker() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="heading-md text-gradient">Activities & Sports</h1>
                    <p className="text-secondary">Track physical activities and discover local fun.</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <Calendar size={18} />
                    <span>Schedule Activity</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upcoming Schedule */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Upcoming Schedule</h2>
                    {activities.map((activity) => (
                        <div key={activity.id} className="glass-panel p-5 flex items-start gap-4">
                            <div className="bg-primary/20 p-3 rounded-xl text-primary font-bold text-center min-w-[60px]">
                                <div className="text-xs uppercase">OCT</div>
                                <div className="text-xl">24</div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold">{activity.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-text-secondary mt-2">
                                    <span className="flex items-center gap-1"><ClockIcon size={14} /> {activity.time}</span>
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {activity.location}</span>
                                </div>
                                <div className="mt-3 flex items-center gap-2 text-xs">
                                    <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">{activity.type}</span>
                                    <span className="flex items-center gap-1 text-text-muted"><Users size={12} /> {activity.attendees} attending</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Local Recommendations */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Local Recommendations</h2>
                        <span className="text-xs text-accent border border-accent/30 rounded-full px-2 py-1">AI Curated</span>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {recommendations.map((rec) => (
                            <div key={rec.id} className="glass-card group cursor-pointer overflow-hidden rounded-xl bg-white/5 border border-white/5 hover:border-white/20">
                                <div className="relative h-32 w-full overflow-hidden">
                                    {/* Placeholder image interaction */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                    <img src={rec.image} alt={rec.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-80" />
                                    <div className="absolute bottom-3 left-4 z-20">
                                        <h3 className="font-bold text-white text-lg">{rec.title}</h3>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-text-secondary mb-3">{rec.description}</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="flex items-center gap-1 text-yellow-400 font-medium"><Star size={14} fill="currentColor" /> {rec.rating}</span>
                                        <span className="text-text-muted flex items-center gap-1"><MapPin size={14} /> {rec.distance}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ClockIcon({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}
