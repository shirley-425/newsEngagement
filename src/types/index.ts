export type WarningType = 'analytical' | 'emotional';
export type Decision = 'share' | 'not_share' | 'dont_know';

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
    warningType?: WarningType | null;
    analyticalWarning?: string | null;
    emotionalWarning?: string | null;
    interactions: Interactions;
    timestamp: string;
    engagementLevel: 'high' | 'low';
}

export interface ParticipantResponse {
    postId: string;
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