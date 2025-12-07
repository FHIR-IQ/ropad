import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Shield, AlertTriangle, MessageSquare, Sparkles, Settings, Clock, CheckCircle, Brain, Lightbulb, ChevronRight, Target } from 'lucide-react';
import { StatCard, InsightCard } from '../components/ui';
import type { BehavioralInsight } from '../types';

interface Message {
    id: number;
    sender: 'ai' | 'user';
    text: string;
    timestamp: string;
}

interface Intervention {
    id: number;
    type: 'block' | 'suggestion' | 'alert' | 'success';
    title: string;
    desc: string;
    time: string;
    severity: 'high' | 'medium' | 'low' | 'success';
}

const quickActions = [
    { id: 1, label: 'Set screen limit', icon: Clock },
    { id: 2, label: 'Check activity', icon: CheckCircle },
    { id: 3, label: 'Get suggestions', icon: Sparkles },
];

const suggestedPrompts = [
    "How was Leo's focus today?",
    "Set a 30-minute gaming limit",
    "Suggest an outdoor activity",
    "When is the next medication?",
];

const guardianInsight: BehavioralInsight = {
    id: 'guardian-insight-1',
    type: 'suggestion',
    category: 'behavior',
    evidenceLevel: 'moderate',
    title: 'Conversation Starter',
    description: "Leo had a productive morning with 45 minutes of educational content. Consider praising this during dinner conversation to reinforce positive habits.",
    actionableSteps: [
        'Mention specific progress in Khan Academy math',
        'Ask what new topics were interesting',
        'Connect learning to future goals'
    ],
    generatedAt: new Date(),
    dismissed: false,
    actedOn: false,
};

export default function AIGuardian() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: 'ai', text: "Hello Sarah! I noticed Leo has been playing Roblox for 90 minutes. Would you like me to suggest a break or set a gentle reminder? I can also share some insights about today's activity patterns.", timestamp: '2:15 PM' },
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

    const sendMessage = (text?: string) => {
        const messageText = text || input;
        if (!messageText.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            sender: 'user',
            text: messageText,
            timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Mock AI response
        setTimeout(() => {
            const responses: Record<string, string> = {
                "How was Leo's focus today?": "Leo's focus has been excellent today! He maintained concentration during his morning Khan Academy session for 45 minutes straight - that's 15 minutes longer than his weekly average. The medication timing was on-point this morning, which seems to correlate with better focus scores.",
                "Set a 30-minute gaming limit": "I've set a 30-minute soft limit on gaming apps. Leo will receive a friendly 5-minute warning before the limit. After that, I'll suggest some alternatives like the new LEGO set or the soccer ball in the garage. Would you like me to notify him directly?",
                "Suggest an outdoor activity": "Based on the current weather (sunny, 68°F) and Leo's interests, I'd recommend: 1) Bike ride to the park - great for burning energy, 2) Backyard soccer practice - he mentioned wanting to work on goal kicks, 3) Walking the dog together - combines responsibility and exercise.",
                "When is the next medication?": "Leo's next medication (Ritalin 10mg) is due at 4:00 PM - that's in about 1 hour and 45 minutes. He's been consistent this week with a 12-day streak. Would you like me to set a reminder?",
            };

            const aiMessage: Message = {
                id: Date.now() + 1,
                sender: 'ai',
                text: responses[messageText] || "I can certainly help with that. I've analyzed Leo's patterns and can provide personalized recommendations. Would you like me to elaborate on any specific area - screen time, medication adherence, or activity suggestions?",
                timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const interventions: Intervention[] = [
        { id: 1, type: 'block', title: 'Content Filter Triggered', desc: 'Blocked a YouTube video with flagged keywords.', time: '10:23 AM', severity: 'medium' },
        { id: 2, type: 'suggestion', title: 'Exercise Recommendation', desc: 'Suggesting "Soccer in the park" due to nice weather.', time: 'Yesterday', severity: 'low' },
        { id: 3, type: 'alert', title: 'Late Night Usage', desc: 'iPad was active at 11:30 PM. Screen locked automatically.', time: 'Yesterday', severity: 'high' },
        { id: 4, type: 'success', title: 'Daily Goal Achieved', desc: 'Leo completed 1 hour of educational content.', time: 'Yesterday', severity: 'success' },
    ];

    const severityColors = {
        high: { dot: 'bg-red-500', text: 'text-red-400' },
        medium: { dot: 'bg-yellow-500', text: 'text-yellow-400' },
        low: { dot: 'bg-blue-500', text: 'text-blue-400' },
        success: { dot: 'bg-green-500', text: 'text-green-400' },
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="heading-md text-gradient">AI Guardian</h1>
                    <p className="text-secondary">Your intelligent co-parenting assistant.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn btn-sm btn-secondary flex items-center gap-2">
                        <Settings size={16} />
                        <span>Settings</span>
                    </button>
                    <div className="flex items-center gap-2 px-4 py-2 bg-success-bg text-success-light rounded-full border border-success/20">
                        <Shield size={18} />
                        <span className="text-sm font-medium">Protection Active</span>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Interventions Today"
                    value="3"
                    subtitle="All resolved"
                    icon={<Shield size={20} className="text-primary-400" />}
                    iconBgColor="bg-primary/20"
                    accentColor="var(--primary)"
                />
                <StatCard
                    label="Focus Score"
                    value="87%"
                    subtitle="Above average"
                    icon={<Target size={20} className="text-success-light" />}
                    iconBgColor="bg-success-bg"
                    trend={{ value: 5, direction: 'up' }}
                    accentColor="var(--success)"
                />
                <StatCard
                    label="AI Insights"
                    value="12"
                    subtitle="Generated this week"
                    icon={<Brain size={20} className="text-accent-400" />}
                    iconBgColor="bg-accent/20"
                    accentColor="var(--accent)"
                />
                <StatCard
                    label="Response Rate"
                    value="< 1s"
                    subtitle="Average response time"
                    icon={<Sparkles size={20} className="text-info-light" />}
                    iconBgColor="bg-info-bg"
                    accentColor="var(--info)"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Live Chat */}
                <div className="lg:col-span-2 glass-panel flex flex-col h-[520px]">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
                                <Bot size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Guardian Assistant</h3>
                                <p className="text-xs text-text-muted flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                            {quickActions.map((action) => (
                                <button
                                    key={action.id}
                                    onClick={() => sendMessage(action.label)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-text-muted hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <action.icon size={14} />
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] lg:max-w-[75%] ${msg.sender === 'user' ? '' : 'flex gap-3'}`}>
                                    {msg.sender === 'ai' && (
                                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                            <Bot size={16} className="text-primary" />
                                        </div>
                                    )}
                                    <div>
                                        <div className={`p-3 rounded-2xl ${msg.sender === 'user'
                                            ? 'bg-gradient-to-r from-primary to-primary/80 text-white rounded-br-sm'
                                            : 'bg-white/8 text-text-primary rounded-bl-sm border border-white/5'
                                            }`}>
                                            <p className="text-sm leading-relaxed">{msg.text}</p>
                                        </div>
                                        <p className={`text-xs text-text-muted mt-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
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
                                    <div className="p-3 rounded-2xl bg-white/8 border border-white/5 rounded-bl-sm">
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

                    {/* Suggested Prompts */}
                    {messages.length <= 2 && (
                        <div className="px-4 pb-2">
                            <div className="flex items-center gap-2 mb-2">
                                <Lightbulb size={14} className="text-text-muted" />
                                <span className="text-xs text-text-muted">Suggested questions</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {suggestedPrompts.map((prompt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => sendMessage(prompt)}
                                        className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-text-secondary hover:text-white hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

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
                                onClick={() => sendMessage()}
                                disabled={!input.trim()}
                                className="px-5 bg-gradient-to-r from-primary to-accent rounded-xl text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Send size={18} />
                                <span className="hidden sm:inline">Send</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-5">
                    {/* AI Insight Card */}
                    <InsightCard
                        insight={guardianInsight}
                        onLearnMore={() => sendMessage("Tell me more about the conversation starter suggestion")}
                        onDismiss={() => console.log('Dismiss')}
                    />

                    {/* Intervention Feed */}
                    <div className="glass-panel p-4">
                        <h3 className="text-base font-semibold mb-4 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <AlertTriangle size={18} />
                                Recent Activity
                            </span>
                            <span className="text-xs text-text-muted font-normal">Last 24h</span>
                        </h3>

                        <div className="space-y-4">
                            {interventions.map((item) => {
                                const colors = severityColors[item.severity];
                                return (
                                    <div key={item.id} className="relative pl-5 border-l-2 border-white/10 hover:border-white/20 transition-colors">
                                        <div className={`absolute -left-[5px] top-1 w-2 h-2 rounded-full ${colors.dot}`} />

                                        <div className="flex justify-between items-start gap-2 mb-1">
                                            <span className={`text-xs font-semibold uppercase ${colors.text}`}>{item.type}</span>
                                            <span className="text-xs text-text-muted whitespace-nowrap">{item.time}</span>
                                        </div>

                                        <h4 className="font-medium text-sm mb-0.5">{item.title}</h4>
                                        <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>

                                        {item.severity === 'medium' && (
                                            <button
                                                onClick={() => sendMessage(`Tell me more about: ${item.title}`)}
                                                className="mt-2 text-xs text-primary flex items-center gap-1 hover:text-primary-400 transition-colors"
                                            >
                                                <MessageSquare size={12} />
                                                Discuss with Guardian
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <button className="w-full mt-4 pt-3 border-t border-white/10 text-center text-sm text-primary hover:text-primary-400 flex items-center justify-center gap-1 transition-colors">
                            View Full History <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
