import React, { useState, useEffect } from 'react';
import { User, Upload } from 'lucide-react';
import PostCard from './components/PostCard';
import ProgressBar from './components/ProgressBar';
import { Post, ParticipantResponse, ExperimentData } from './types';
import { importPostsFromExcel } from './utils/excelImport';
import { LocalStorageService } from './services/storage';
import { defaultPosts } from './data/posts';

const storageService = new LocalStorageService();

// Function to randomize array using Fisher-Yates shuffle
const shuffleArray = (array: Post[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const App: React.FC = () => {
    const [participantId, setParticipantId] = useState<string>('');
    const [isStarted, setIsStarted] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);
    const [posts, setPosts] = useState<Post[]>(() => {
        // Try to load saved dataset first, fall back to default posts if none exists
        const savedDataset = storageService.getDataset();
        return savedDataset || defaultPosts;
    });
    const [responses, setResponses] = useState<ParticipantResponse[]>([]);
    const [startTime, setStartTime] = useState<string>('');
    const [experimentData, setExperimentData] = useState<ExperimentData | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [adminPanel, setAdminPanel] = useState(false);
    const [reviewMode, setReviewMode] = useState(false);
    const [reviewedParticipant, setReviewedParticipant] = useState<ExperimentData | null>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        setError(null);

        try {
            const importedPosts = await importPostsFromExcel(file);
            const shuffledPosts = shuffleArray(importedPosts);
            setPosts(shuffledPosts);
            // Save the dataset to local storage
            storageService.saveDataset(shuffledPosts);
            alert(`Successfully loaded ${importedPosts.length} posts!`);
        } catch (error) {
            console.error('Error importing posts:', error);
            setError('Failed to import posts. Please check the file format.');
            alert('Error loading posts. Please make sure the file format is correct.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleStart = () => {
        if (!participantId) {
            alert('Please enter your participant ID');
            return;
        }
        // Use the current posts without re-shuffling
        setStartTime(new Date().toISOString());
        setIsStarted(true);
    };

    const handleDecision = (postId: string, decision: 'share' | 'not_share' | 'dont_know') => {
        const post = posts.find(p => p.id === postId);
        if (!post) return;

        setResponses(prev => {
            const existing = prev.findIndex(r => r.postId === postId);
            const newResponse = {
                postId,
                warningType: post.warningType,
                engagementLevel: post.engagementLevel,
                decision,
                timestamp: new Date().toISOString()
            };

            if (existing !== -1) {
                const newResponses = [...prev];
                newResponses[existing] = newResponse;
                return newResponses;
            }
            return [...prev, newResponse];
        });
    };

    const handleFinish = () => {
        const unansweredPosts = posts.filter(
            post => !responses.find(r => r.postId === post.id)
        );

        if (unansweredPosts.length > 0) {
            const firstUnanswered = document.getElementById(`post-${unansweredPosts[0].id}`);
            if (firstUnanswered) {
                firstUnanswered.scrollIntoView({ behavior: 'smooth' });
            }
            alert(`Please respond to all posts before finishing. ${unansweredPosts.length} posts remaining.`);
            return;
        }

        const experimentData: ExperimentData = {
            participantId,
            responses,
            startTime,
            endTime: new Date().toISOString(),
            experimentVersion: '1.0.0'
        };

        try {
            storageService.saveResponse(experimentData);
            setExperimentData(experimentData);
            alert('Thank you for participating! Your responses have been saved.');

            // Reset for next participant but keep the current posts
            setParticipantId('');
            setResponses([]);
            setIsStarted(false);
            // Randomize the posts again for the next participant
            setPosts(shuffleArray([...posts]));
        } catch (error) {
            console.error('Error saving responses:', error);
            alert('Error saving responses. Please try again or contact the administrator.');
        }
    };

    // Admin: Review participant answers
    const handleReviewParticipant = () => {
        const id = prompt('Enter participant ID to review:');
        if (!id) return;
        const allResponses = storageService.getAllResponses();
        const participant = allResponses.find(r => r.participantId === id);
        if (!participant) {
            alert('Participant ID not found.');
            return;
        }
        setReviewedParticipant(participant);
        setReviewMode(true);
    };

    // Admin: Exit admin panel
    const handleExitAdmin = () => {
        setIsAdmin(false);
        setAdminPanel(false);
    };

    // Admin: Go to admin panel
    const handleAdminAccess = () => {
        const password = prompt('Enter admin password:');
        if (password === 'admin123') {
            setIsAdmin(true);
            setAdminPanel(true);
        }
    };

    const handleExportData = () => {
        storageService.exportToCSV();
    };

    const handleClearData = () => {
        if (window.confirm('Are you sure you want to clear all experiment data? This action cannot be undone.')) {
            storageService.clearAllData();
            storageService.clearDataset(); // Also clear the dataset
            setPosts(defaultPosts); // Reset to default posts
            alert('All data has been cleared successfully.');
        }
    };

    // --- RENDER LOGIC ---
    // 1. Review mode (highest priority)
    if (isAdmin && reviewMode && reviewedParticipant) {
        const dataset = storageService.getDataset() || defaultPosts;
        const responseMap = Object.fromEntries(
            reviewedParticipant.responses.map(r => [r.postId, r])
        );
        return (
            <div className="max-w-2xl mx-auto bg-white min-h-screen shadow-lg">
                <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-200 p-4 flex items-center justify-between">
                    <div className="font-bold text-lg">Reviewing Participant: {reviewedParticipant.participantId}</div>
                    <button
                        onClick={() => { setReviewMode(false); setReviewedParticipant(null); setAdminPanel(true); }}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Back to Admin
                    </button>
                </div>
                <div className="divide-y divide-gray-200">
                    {dataset.map(post => (
                        <div key={post.id} className="bg-white">
                            <PostCard
                                post={post}
                                onDecision={() => { }}
                                selectedDecision={responseMap[post.id]?.decision}
                                reviewMode={true}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // 2. Admin panel
    if (isAdmin && adminPanel) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
                        <p className="text-gray-600">Manage experiment data and review participants</p>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload Custom Posts Data (Optional)
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className={`w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg tracking-wide border border-blue cursor-pointer transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50'}`}>
                                    <Upload className="w-8 h-8 text-blue-500" />
                                    <span className="mt-2 text-base leading-normal">
                                        {isLoading ? 'Loading...' : 'Select a file'}
                                    </span>
                                    <input
                                        type='file'
                                        className="hidden"
                                        accept=".xlsx,.xls"
                                        onChange={handleFileUpload}
                                        disabled={isLoading}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleExportData}
                                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                Export Data
                            </button>
                            <button
                                onClick={handleClearData}
                                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
                            >
                                Clear All Data
                            </button>
                        </div>
                        <button
                            onClick={handleReviewParticipant}
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                        >
                            Review Participant
                        </button>
                        <button
                            onClick={() => { setIsAdmin(false); setAdminPanel(false); setReviewMode(false); setReviewedParticipant(null); }}
                            className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                        >
                            Exit Admin
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // 3. Participant flow (not admin)
    if (!isStarted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome!</h1>
                    </div>
                    {/* Participant ID Input */}
                    <div className="mb-8">
                        <label htmlFor="participantId" className="block text-sm font-medium text-gray-700 mb-2">
                            Participant ID
                        </label>
                        <input
                            type="number"
                            id="participantId"
                            value={participantId}
                            onChange={(e) => setParticipantId(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter your ID number"
                        />
                    </div>
                    {/* Instructions */}
                    <div className="space-y-6 text-gray-700 text-lg leading-relaxed border-t border-gray-200 pt-6">
                        <p>
                            In this short task, you'll be shown a series of social media news posts on topics like current events, health, science, and politics. We'd like you to imagine you're browsing these posts using an <span className="italic">anonymous, public social media account</span> — it doesn't show your name or personal details, but anything you post from it can be seen by anyone online.
                        </p>
                        <p>
                            For each post, we'll ask whether you would share it <span className="italic">with the world</span> from that account.
                        </p>
                        <p>
                            You'll have three choices:
                        </p>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>
                                <span className="font-semibold italic">Share</span> – Pick this if you'd feel okay putting this post out there for others to see, as something you'd want to share with the public.
                            </li>
                            <li>
                                <span className="font-semibold italic">Not Share</span> – Pick this if you wouldn't share the post. That might be because it seems untrustworthy, uninteresting, upsetting, or just not something you'd want to be associated with — even from an anonymous account.
                            </li>
                            <li>
                                <span className="font-semibold italic">Don't Know</span> – Pick this if you're on the fence. Maybe you're unsure whether the post is accurate, or just can't decide one way or the other. (These answers won't be used in the final analysis.)
                            </li>
                        </ul>
                        <p>
                            There are no right or wrong answers — we're just interested in your honest reactions. Think of it like scrolling through your feed and deciding what you'd repost or skip.
                        </p>
                        <p className="text-center font-medium">
                            Take your time, and thanks for helping us out!
                        </p>
                    </div>
                    <div className="mt-8 flex flex-col items-center gap-4">
                        <button
                            onClick={handleStart}
                            disabled={!participantId || isLoading}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Loading...' : 'Start Test'}
                        </button>
                        {/* Admin Access Button */}
                        <button
                            onClick={handleAdminAccess}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Administrator Access
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-white min-h-screen shadow-lg">
            <ProgressBar
                current={responses.length}
                total={posts.length}
                participantId={participantId}
            />

            {/* Posts Feed */}
            <div className="divide-y divide-gray-200">
                {posts.map(post => (
                    <div
                        key={post.id}
                        id={`post-${post.id}`}
                        className={`transition-all duration-300 ${!responses.find(r => r.postId === post.id)
                            ? 'bg-white'
                            : 'bg-gray-50'
                            }`}
                    >
                        <PostCard
                            post={post}
                            onDecision={(decision) => handleDecision(post.id, decision)}
                            selectedDecision={responses.find(r => r.postId === post.id)?.decision}
                        />
                    </div>
                ))}
            </div>

            {/* Finish Button */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 shadow-lg">
                <button
                    onClick={handleFinish}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                    <span>Finish Test</span>
                    {responses.length === posts.length && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};

export default App; 