import React from 'react';
import { Info } from 'lucide-react';
import { WarningType } from '../types';

interface WarningBannerProps {
    type: WarningType;
    message: string | null;
}

const WarningBanner: React.FC<WarningBannerProps> = ({ type, message }) => {
    if (!type || !message) return null;

    return (
        <div className="mt-2 mb-3">
            <div className="bg-blue-50 rounded-2xl p-3 border border-blue-100">
                <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500" />
                    <p className="text-blue-700 text-[15px] leading-5">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WarningBanner; 