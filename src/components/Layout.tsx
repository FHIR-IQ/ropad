import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Pill, Monitor, Activity, Bot, Menu, X } from 'lucide-react';
import { OnboardingModal } from './OnboardingModal';

export const Layout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Pill, label: 'Medication', path: '/medication' },
        { icon: Monitor, label: 'Devices', path: '/devices' },
        { icon: Activity, label: 'Activities', path: '/activities' },
        { icon: Bot, label: 'AI Guardian', path: '/guardian' },
    ];

    return (
        <div className="flex min-h-screen">
            <OnboardingModal />

            {/* Sidebar - Desktop */}
            <aside className="w-64 glass-panel fixed h-[96vh] m-4 hidden md:flex flex-col border-r border-white/10 z-50">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gradient">ADHD Guardian</h2>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive
                                    ? 'bg-primary/20 text-white shadow-lg border border-white/5'
                                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                                }
              `}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 mt-auto">
                    <div className="glass-card p-4 rounded-xl">
                        <p className="text-sm text-text-muted mb-2">Connected Device</p>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs text-white">Leo's iPad</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 glass-panel z-50 flex items-center justify-between px-4 m-2">
                <span className="font-bold text-gradient text-lg">ADHD Guardian</span>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-white hover:bg-white/10 rounded-lg"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-xl md:hidden pt-24 px-6 animate-in slide-in-from-top-10 duration-200">
                    <nav className="space-y-4">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => `
                    flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 text-lg
                    ${isActive
                                        ? 'bg-primary/20 text-white border border-white/5'
                                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                                    }
                  `}
                            >
                                <item.icon size={24} />
                                <span className="font-medium">{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 md:ml-72 p-4 md:p-8 pt-24 md:pt-8 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
