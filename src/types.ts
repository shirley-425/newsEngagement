export type WarningType = 'analytical' | 'emotional';
export type Decision = 'share' | 'not_share' | 'dont_know';
export type EngagementLevel = 'high' | 'low';

export interface Author {
    name: string;
    handle: string;
    verified: boolean;
}

export interface Interactions {
    likes: number;
    comments: number;
    reposts: number;
}

export interface Post {
    id: string;
    author: Author;
    content: string;
    isTrue: boolean;
    topic: string;
    newsURL: string;
    mediaUrl?: string;
    warningType: WarningType;
    analyticalWarning: string;
    emotionalWarning: string;
    interactions: Interactions;
    timestamp: string;
    engagementLevel: EngagementLevel;
}

export interface ParticipantResponse {
    postId: string;
    warningType: WarningType;
    engagementLevel: EngagementLevel;
    decision: Decision;
    timestamp: string;
}

export interface ExperimentData {
    participantId: string;
    responses: ParticipantResponse[];
    startTime: string;
    endTime: string;
    experimentVersion: string;
}

// Remove unused interfaces
// export interface ExperimentMetadata {
//     browser: string;
//     platform: string;
//     screenResolution: string;
//     timestamp: string;
//     totalDuration: number;
// }

// export interface NewsItem {
//     id: string;
//     content: string;
//     author: string;
//     timestamp: string;
//     imageUrl?: string;
//     isTrue: boolean;
//     topic: 'current_events' | 'health' | 'science' | 'politics';
// }

// export interface Warning {
//     type: 'analytical' | 'emotional';
//     message: string;
// }

// export interface UserResponse {
//     itemId: string;
//     credibilityRating: number;
//     sharingWillingness: number;
//     timestamp: number;
// } 