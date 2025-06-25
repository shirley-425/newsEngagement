import React from 'react';
import { MessageCircle, Repeat2, Heart, Share2, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { Post, Decision } from '../types';
import WarningBanner from './WarningBanner';

interface PostCardProps {
    post: Post;
    onDecision: (decision: Decision) => void;
    selectedDecision?: Decision;
    reviewMode?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDecision, selectedDecision, reviewMode = false }) => {
    const {
        author,
        content,
        interactions,
        timestamp,
        warningType,
        analyticalWarning,
        emotionalWarning,
        isTrue
    } = post;

    // Get the appropriate warning message based on warning type and isTrue flag
    const warningMessage = !isTrue && warningType ?
        (warningType === 'analytical' ? analyticalWarning : emotionalWarning) :
        null;

    // Generate avatar URL using author's handle as seed
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(author.handle)}`;

    return (
        <article className="p-4 hover:bg-gray-50 transition-colors">
            {/* Author Info */}
            <div className="flex items-center gap-3 mb-2">
                <img
                    src={avatarUrl}
                    alt={`${author.name}'s avatar`}
                    className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0"
                />
                <div>
                    <div className="flex items-center gap-1">
                        <span className="font-bold">{author.name}</span>
                        {author.verified && (
                            <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                    </div>
                    <div className="text-gray-500 text-sm">{author.handle}</div>
                </div>
                <span className="text-gray-500 text-sm ml-auto">{timestamp}</span>
            </div>

            {/* Warning Banner - only show for false news */}
            {!isTrue && warningType && warningMessage && (
                <WarningBanner
                    type={warningType}
                    message={warningMessage}
                />
            )}

            {/* Content */}
            <div className="mt-3 mb-3">
                <p className="text-gray-900 whitespace-pre-wrap">{content}</p>
            </div>

            {/* Interaction Stats */}
            <div className="flex items-center justify-between text-gray-500 mt-3 mb-4">
                <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{interactions.comments}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Repeat2 className="w-4 h-4" />
                    <span className="text-sm">{interactions.reposts}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{interactions.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Share2 className="w-4 h-4" />
                </div>
            </div>

            {/* Decision Buttons */}
            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => onDecision('share')}
                    disabled={reviewMode}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border transition-all ${selectedDecision === 'share'
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : 'hover:bg-gray-50 border-gray-200'
                        } ${reviewMode ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    <CheckCircle2 className="w-5 h-5" />
                    Share
                </button>
                <button
                    onClick={() => onDecision('not_share')}
                    disabled={reviewMode}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border transition-all ${selectedDecision === 'not_share'
                        ? 'bg-red-100 border-red-500 text-red-700'
                        : 'hover:bg-gray-50 border-gray-200'
                        } ${reviewMode ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    <XCircle className="w-5 h-5" />
                    Don't Share
                </button>
                <button
                    onClick={() => onDecision('dont_know')}
                    disabled={reviewMode}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border transition-all ${selectedDecision === 'dont_know'
                        ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
                        : 'hover:bg-gray-50 border-gray-200'
                        } ${reviewMode ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    <HelpCircle className="w-5 h-5" />
                    Not Sure
                </button>
            </div>
        </article>
    );
};

export default PostCard; 