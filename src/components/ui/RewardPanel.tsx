import { useState } from 'react';
import { Coins, Trophy, Gift, Star, ChevronRight, Sparkles, CheckCircle, Clock, Target } from 'lucide-react';
import type { RewardItem, TokenTransaction, RewardEarningRule } from '../../types';
import { ProgressBar } from './ProgressBar';
import { TokenBadge } from './TokenBadge';

interface RewardPanelProps {
    currentTokens: number;
    lifetimeTokensEarned: number;
    recentTransactions: TokenTransaction[];
    earningRules: RewardEarningRule[];
    rewardMenu: RewardItem[];
    onRedeemReward?: (rewardId: string) => void;
    className?: string;
}

// Mock earning rules
const defaultEarningRules: RewardEarningRule[] = [
    { id: '1', behavior: 'Take medication on time', tokensEarned: 10, frequency: 'per_occurrence', maxPerDay: 30, active: true },
    { id: '2', behavior: 'Complete homework without reminders', tokensEarned: 15, frequency: 'per_occurrence', maxPerDay: 15, active: true },
    { id: '3', behavior: '30 minutes of physical activity', tokensEarned: 10, frequency: 'daily', active: true },
    { id: '4', behavior: 'Follow screen time limits', tokensEarned: 20, frequency: 'daily', active: true },
    { id: '5', behavior: 'Help with household chores', tokensEarned: 5, frequency: 'per_occurrence', active: true },
];

// Mock reward menu
const defaultRewardMenu: RewardItem[] = [
    { id: '1', name: '30 min extra screen time', description: 'Bonus gaming or video time', tokenCost: 50, category: 'screen_time', available: true },
    { id: '2', name: 'Choose dinner meal', description: 'Pick what the family has for dinner', tokenCost: 75, category: 'privilege', available: true },
    { id: '3', name: 'Stay up 30 min later', description: 'Extended bedtime on a weekend night', tokenCost: 60, category: 'privilege', available: true },
    { id: '4', name: 'Trip to ice cream shop', description: 'Family outing for a treat', tokenCost: 100, category: 'activity', available: true },
    { id: '5', name: 'New toy/game (up to $15)', description: 'Choose a small item from the store', tokenCost: 200, category: 'item', available: true },
];

// Mock recent transactions
const defaultTransactions: TokenTransaction[] = [
    { id: '1', timestamp: new Date(), type: 'earned', amount: 10, reason: 'Took morning medication on time' },
    { id: '2', timestamp: new Date(Date.now() - 3600000), type: 'earned', amount: 15, reason: 'Finished math homework independently' },
    { id: '3', timestamp: new Date(Date.now() - 7200000), type: 'spent', amount: -50, reason: 'Redeemed: 30 min extra screen time' },
    { id: '4', timestamp: new Date(Date.now() - 86400000), type: 'earned', amount: 20, reason: 'Followed screen time limits all day' },
];

export const RewardPanel = ({
    currentTokens = 145,
    lifetimeTokensEarned = 2340,
    recentTransactions = defaultTransactions,
    earningRules = defaultEarningRules,
    rewardMenu = defaultRewardMenu,
    onRedeemReward,
    className = '',
}: RewardPanelProps) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'earn' | 'spend'>('overview');

    const todaysEarnings = recentTransactions
        .filter(t => t.type === 'earned' && new Date(t.timestamp).toDateString() === new Date().toDateString())
        .reduce((sum, t) => sum + t.amount, 0);

    const nextReward = rewardMenu.find(r => r.available && r.tokenCost > currentTokens);
    const progressToNextReward = nextReward ? Math.min(100, (currentTokens / nextReward.tokenCost) * 100) : 100;

    const categoryIcons = {
        screen_time: <Clock size={14} />,
        activity: <Star size={14} />,
        privilege: <Trophy size={14} />,
        item: <Gift size={14} />,
    };

    return (
        <div className={`glass-panel ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg">
                            <Coins size={20} className="text-yellow-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Reward Tokens</h3>
                            <p className="text-xs text-text-muted">Great job, Leo!</p>
                        </div>
                    </div>
                    <TokenBadge amount={currentTokens} size="lg" />
                </div>

                {/* Today's Progress */}
                <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-text-secondary">Today's earnings</span>
                        <span className="text-sm font-medium text-success-light">+{todaysEarnings} tokens</span>
                    </div>
                    {nextReward && (
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-text-muted">Next reward: {nextReward.name}</span>
                                <span className="text-xs text-text-muted">{currentTokens}/{nextReward.tokenCost}</span>
                            </div>
                            <ProgressBar value={progressToNextReward} variant="gradient" size="sm" />
                        </div>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
                {(['overview', 'earn', 'spend'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                            activeTab === tab
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-text-muted hover:text-white'
                        }`}
                    >
                        {tab === 'overview' ? 'Activity' : tab === 'earn' ? 'How to Earn' : 'Rewards'}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-4 max-h-[300px] overflow-y-auto scrollbar-thin">
                {activeTab === 'overview' && (
                    <div className="space-y-3">
                        {recentTransactions.slice(0, 5).map((tx) => (
                            <div key={tx.id} className="flex items-center gap-3">
                                <div className={`p-1.5 rounded-lg ${tx.type === 'earned' ? 'bg-success-bg' : tx.type === 'spent' ? 'bg-accent/20' : 'bg-primary/20'}`}>
                                    {tx.type === 'earned' ? (
                                        <CheckCircle size={14} className="text-success-light" />
                                    ) : tx.type === 'spent' ? (
                                        <Gift size={14} className="text-accent-400" />
                                    ) : (
                                        <Sparkles size={14} className="text-primary-400" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white truncate">{tx.reason}</p>
                                    <p className="text-xs text-text-muted">
                                        {new Date(tx.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                                    </p>
                                </div>
                                <span className={`text-sm font-medium ${tx.amount > 0 ? 'text-success-light' : 'text-accent-400'}`}>
                                    {tx.amount > 0 ? '+' : ''}{tx.amount}
                                </span>
                            </div>
                        ))}
                        <button className="w-full text-center text-sm text-primary hover:text-primary-400 py-2 flex items-center justify-center gap-1">
                            View Full History <ChevronRight size={14} />
                        </button>
                    </div>
                )}

                {activeTab === 'earn' && (
                    <div className="space-y-3">
                        {earningRules.filter(r => r.active).map((rule) => (
                            <div key={rule.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/8 transition-colors">
                                <div className="p-1.5 rounded-lg bg-primary/20 mt-0.5">
                                    <Target size={14} className="text-primary-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white">{rule.behavior}</p>
                                    <p className="text-xs text-text-muted">
                                        {rule.frequency === 'per_occurrence' ? 'Each time' : rule.frequency === 'daily' ? 'Once per day' : 'Once per week'}
                                        {rule.maxPerDay && ` (max ${rule.maxPerDay}/day)`}
                                    </p>
                                </div>
                                <TokenBadge amount={rule.tokensEarned} size="sm" />
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'spend' && (
                    <div className="space-y-3">
                        {rewardMenu.filter(r => r.available).map((reward) => {
                            const canAfford = currentTokens >= reward.tokenCost;
                            return (
                                <div
                                    key={reward.id}
                                    className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                                        canAfford ? 'bg-white/5 hover:bg-white/8 cursor-pointer' : 'bg-white/2 opacity-60'
                                    }`}
                                    onClick={() => canAfford && onRedeemReward?.(reward.id)}
                                >
                                    <div className={`p-1.5 rounded-lg ${canAfford ? 'bg-accent/20' : 'bg-white/10'} mt-0.5`}>
                                        {categoryIcons[reward.category]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-white">{reward.name}</p>
                                        <p className="text-xs text-text-muted">{reward.description}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <TokenBadge amount={reward.tokenCost} size="sm" />
                                        {canAfford && (
                                            <span className="text-xs text-success-light">Available!</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Footer Stats */}
            <div className="p-3 border-t border-white/10 bg-white/3">
                <div className="flex justify-between text-xs text-text-muted">
                    <span>Lifetime earned: <span className="text-white font-medium">{lifetimeTokensEarned.toLocaleString()}</span></span>
                    <span>This week: <span className="text-success-light font-medium">+85</span></span>
                </div>
            </div>
        </div>
    );
};
