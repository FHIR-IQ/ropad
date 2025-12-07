import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Shield, AlertTriangle, MessageSquare, Sparkles, Settings, Clock, CheckCircle } from 'lucide-react';

interface Message {
    id: number;
    sender: 'ai' | 'user';
    text: string;
    timestamp: string;
}

const quickActions = [
    { id: 1, label: 'Set screen limit', icon: Clock },
    { id: 2, label: 'Check activity', icon: CheckCircle },
    { id: 3, label: 'AI suggestions', icon: Sparkles },
];

export default function AIGuardian() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: 'ai', text: 'Hello Sarah! I noticed Leo has been playing Roblox for 90 minutes. Would you like me to suggest a break or set a gentle reminder?', timestamp: '2:15 PM' },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim()) return;
        const userMessage: Message = {
            id: Date.now(),
            sender: 'user',
            text: input,
            timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Mock AI response
        setTimeout(() => {
            const aiMessage: Message = {
                id: Date.now() + 1,
                sender: 'ai',
                text: 'I can certainly help with that. I\'ve set a 15-minute soft lock on gaming apps. Leo will receive a friendly notification before the lock activates. Would you like me to suggest some offline activities as alternatives?',
                timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const interventions = [
        { id: 1, type: 'block', title: 'Content Filter Triggered', desc: 'Blocked a YouTube video with flagged keywords.', time: '10:23 AM', severity: 'medium' },
        { id: 2, type: 'suggestion', title: 'Exercise Recommendation', desc: 'Suggesting "Soccer in the park" due to nice weather.', time: 'Yesterday', severity: 'low' },
        { id: 3, type: 'alert', title: 'Late Night Usage', desc: 'iPad was active at 11:30 PM. Screen locked automatically.', time: 'Yesterday', severity: 'high' },
        { id: 4, type: 'success', title: 'Daily Goal Achieved', desc: 'Leo completed 1 hour of educational content.', time: 'Yesterday', severity: 'success' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="heading-md text-gradient">AI Guardian</h1>
                    <p className="text-secondary">Your intelligent co-parenting assistant.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-ghost flex items-center gap-2 text-sm border border-white/10">
                        <Settings size={16} />
                        <span>Settings</span>
                    </button>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                        <Shield size={18} />
                        <span className="text-sm font-medium">Protection Active</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Live Chat */}
                <div className="xl:col-span-2 glass-panel flex flex-col h-[650px]">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
                                <Bot size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Guardian Assistant</h3>
                                <p className="text-xs text-text-muted flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    Online • Monitoring active
                                </p>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                            {quickActions.map((action) => (
                                <button
                                    key={action.id}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-text-muted hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <action.icon size={14} />
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] lg:max-w-[70%] ${msg.sender === 'user' ? '' : 'flex gap-3'}`}>
                                    {msg.sender === 'ai' && (
                                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                            <Bot size={16} className="text-primary" />
                                        </div>
                                    )}
                                    <div>
                                        <div className={`p-4 rounded-2xl ${msg.sender === 'user'
                                            ? 'bg-gradient-to-r from-primary to-primary/80 text-white rounded-br-sm'
                                            : 'bg-white/8 text-text-primary rounded-bl-sm border border-white/5'
                                            }`}>
                                            <p className="text-sm leading-relaxed">{msg.text}</p>
                                        </div>
                                        <p className={`text-xs text-text-muted mt-1.5 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                                            {msg.timestamp}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                        <Bot size={16} className="text-primary" />
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white/8 border border-white/5 rounded-bl-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t border-white/10">
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder="Ask for advice, set rules, or get suggestions..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:border-primary focus:bg-white/8 transition-all"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!input.trim()}
                                className="px-5 bg-gradient-to-r from-primary to-accent rounded-xl text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Send size={18} />
                                <span className="hidden sm:inline">Send</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Intervention Feed */}
                <div className="glass-panel p-6 h-[650px] overflow-hidden flex flex-col">
                    <h3 className="text-lg font-semibold mb-6 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                            <AlertTriangle size={20} />
                            Recent Activity
                        </span>
                        <span className="text-xs text-text-muted font-normal">Last 24h</span>
                    </h3>

                    <div className="flex-1 overflow-y-auto space-y-5 pr-2">
                        {interventions.map((item) => (
                            <div key={item.id} className="relative pl-6 border-l-2 border-white/10 pb-5 last:pb-0 hover:border-white/20 transition-colors">
                                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-bg-primary ${
                                    item.severity === 'high' ? 'bg-red-500' :
                                    item.severity === 'medium' ? 'bg-yellow-500' :
                                    item.severity === 'success' ? 'bg-green-500' : 'bg-blue-500'
                                }`} />

                                <div className="mb-1 flex justify-between items-start gap-2">
                                    <span className={`text-xs font-bold uppercase ${
                                        item.severity === 'high' ? 'text-red-400' :
                                        item.severity === 'medium' ? 'text-yellow-400' :
                                        item.severity === 'success' ? 'text-green-400' : 'text-blue-400'
                                    }`}>{item.type}</span>
                                    <span className="text-xs text-text-muted whitespace-nowrap">{item.time}</span>
                                </div>

                                <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                                <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>

                                {item.severity === 'medium' && (
                                    <button className="mt-2 text-xs text-primary flex items-center gap-1 hover:underline">
                                        <MessageSquare size={12} />
                                        Discuss with Guardian
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10">
                        <button className="w-full text-center text-sm text-primary hover:underline">
                            View Full History
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
