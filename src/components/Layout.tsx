import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Pill, Monitor, Activity, Bot, Menu, X, Bell, Settings, HelpCircle } from 'lucide-react';
import { OnboardingModal } from './OnboardingModal';

export const Layout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/', description: 'Overview & insights' },
        { icon: Pill, label: 'Medication', path: '/medication', description: 'Dosage tracking' },
        { icon: Monitor, label: 'Devices', path: '/devices', description: 'Screen time limits' },
        { icon: Activity, label: 'Activities', path: '/activities', description: 'Sports & events' },
        { icon: Bot, label: 'AI Guardian', path: '/guardian', description: 'Smart assistant' },
    ];

    const currentPage = navItems.find(item => item.path === location.pathname);

    return (
        <div className="flex min-h-screen bg-bg-primary">
            <OnboardingModal />

            {/* Sidebar - Desktop */}
            <aside className="w-72 glass-panel fixed h-[calc(100vh-32px)] m-4 hidden lg:flex flex-col border-r border-white/10 z-50">
                <div className="p-6 border-b border-white/5">
                    <h2 className="text-2xl font-bold text-gradient">ADHD Guardian</h2>
                    <p className="text-xs text-text-muted mt-1">Parental Dashboard</p>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                                ${isActive
                                    ? 'bg-primary/20 text-white shadow-lg border border-white/10'
                                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                                }
                            `}
                        >
                            <item.icon size={20} className="flex-shrink-0" />
                            <div className="flex flex-col">
                                <span className="font-medium">{item.label}</span>
                                <span className="text-xs text-text-muted group-hover:text-text-secondary transition-colors">{item.description}</span>
                            </div>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5 space-y-3">
                    <div className="glass-card p-4 rounded-xl">
                        <p className="text-sm text-text-muted mb-2">Connected Device</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-sm text-white font-medium">Leo's iPad</span>
                            </div>
                            <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">Online</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 pt-2">
                        <button className="p-2 text-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors" title="Settings">
                            <Settings size={18} />
                        </button>
                        <button className="p-2 text-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors" title="Help">
                            <HelpCircle size={18} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 glass-panel z-50 flex items-center justify-between px-4 mx-2 mt-2 rounded-xl">
                <span className="font-bold text-gradient text-lg">ADHD Guardian</span>
                <div className="flex items-center gap-2">
                    <button className="p-2 text-text-muted hover:text-white hover:bg-white/10 rounded-lg relative">
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-white hover:bg-white/10 rounded-lg"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-bg-primary/98 backdrop-blur-xl lg:hidden pt-24 px-6 animate-in slide-in-from-top-10 duration-200">
                    <nav className="space-y-3">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => `
                                    flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 text-lg
                                    ${isActive
                                        ? 'bg-primary/20 text-white border border-white/10'
                                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                                    }
                                `}
                            >
                                <item.icon size={24} />
                                <div className="flex flex-col">
                                    <span className="font-medium">{item.label}</span>
                                    <span className="text-sm text-text-muted">{item.description}</span>
                                </div>
                            </NavLink>
                        ))}
                    </nav>
                    <div className="mt-8 glass-card p-4 rounded-xl">
                        <p className="text-sm text-text-muted mb-2">Connected Device</p>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-sm text-white">Leo's iPad</span>
                            <span className="text-xs text-green-400 ml-auto">Online</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 lg:ml-80 p-4 lg:p-8 pt-24 lg:pt-8 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Desktop Header Bar */}
                    <div className="hidden lg:flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                        <div>
                            <h1 className="text-sm text-text-muted uppercase tracking-wider">{currentPage?.label || 'Dashboard'}</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-text-muted hover:text-white hover:bg-white/5 rounded-lg relative transition-colors">
                                <Bell size={20} />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            </button>
                            <div className="h-8 w-px bg-white/10"></div>
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                                    S
                                </div>
                                <div className="text-sm">
                                    <p className="text-white font-medium">Sarah</p>
                                    <p className="text-text-muted text-xs">Parent</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
