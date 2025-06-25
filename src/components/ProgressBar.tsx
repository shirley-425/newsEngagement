import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
    participantId: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, participantId }) => {
    const percentage = Math.round((current / total) * 100);

    return (
        <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="text-sm font-medium text-gray-600">
                        ID: {participantId}
                    </div>
                    <div className="h-2 w-full max-w-xs bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                        {current}/{total} posts
                    </div>
                </div>
                <div className="text-sm font-medium text-gray-600">
                    {percentage}% Complete
                </div>
            </div>
        </div>
    );
};

export default ProgressBar; 