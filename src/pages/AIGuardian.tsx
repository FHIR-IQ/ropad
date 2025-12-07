import { useState } from 'react';
import { Bot, Send, Shield, AlertTriangle, MessageSquare } from 'lucide-react';

export default function AIGuardian() {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: 'Hello! I noticed Leo has been playing Roblox for 90 minutes. Shall I suggest a break?' },
    ]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages, { id: Date.now(), sender: 'user', text: input }]);
        setInput('');
        // Mock response
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: 'I can certainly help with that. Setting a 15-minute soft lock on gaming apps now.' }]);
        }, 1000);
    };

    const interventions = [
        { id: 1, type: 'block', title: 'Content Filter Triggered', desc: 'Blocked a YouTube video with flagged keywords.', time: '10:23 AM', severity: 'medium' },
        { id: 2, type: 'suggestion', title: 'Exercise Recommendation', desc: 'Suggesting "Soccer in the park" due to nice weather.', time: 'Yesterday', severity: 'low' },
        { id: 3, type: 'alert', title: 'Late Night Usage', desc: 'iPad was active at 11:30 PM. Screen locked automatically.', time: 'Yesterday', severity: 'high' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="heading-md text-gradient">AI Guardian</h1>
                    <p className="text-secondary">Your intelligent co-parenting assistant.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                    <Shield size={18} />
                    <span className="text-sm font-medium">Protection Active</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
                {/* Live Chat */}
                <div className="lg:col-span-2 glass-panel flex flex-col h-full">
                    <div className="p-4 border-b border-white/10 flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-lg text-primary">
                            <Bot size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold">Guardian Assistant</h3>
                            <p className="text-xs text-text-muted">Online • Monitoring active</p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-4 rounded-2xl ${msg.sender === 'user'
                                    ? 'bg-primary text-white rounded-br-none'
                                    : 'bg-white/10 text-text-primary rounded-bl-none'
                                    }`}>
                                    <p>{msg.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-white/10">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder="Ask for advice or set a rule..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                            />
                            <button
                                onClick={sendMessage}
                                className="p-3 bg-primary rounded-xl text-white hover:opacity-90 transition-opacity"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Intervention Feed */}
                <div className="glass-panel p-6 overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <AlertTriangle size={20} />
                        Recent Interventions
                    </h3>

                    <div className="space-y-6">
                        {interventions.map((item) => (
                            <div key={item.id} className="relative pl-6 border-l-2 border-white/10 pb-6 last:pb-0">
                                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-[#0a0b1e] ${item.severity === 'high' ? 'bg-red-500' :
                                    item.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                    }`} />

                                <div className="mb-1 flex justify-between items-start">
                                    <span className={`text-xs font-bold uppercase ${item.severity === 'high' ? 'text-red-400' :
                                        item.severity === 'medium' ? 'text-yellow-400' : 'text-green-400'
                                        }`}>{item.type}</span>
                                    <span className="text-xs text-text-muted">{item.time}</span>
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
                </div>
            </div>
        </div>
    );
}
