import * as XLSX from 'xlsx';
import { Post, WarningType, EngagementLevel } from '../types';

export const importPostsFromExcel = async (file: File): Promise<Post[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Convert Excel data to JSON
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                // Map Excel columns to Post type
                const posts: Post[] = jsonData.map((row: any, index) => {
                    const isTrue = row.isTrue === 'TRUE';
                    const basePost = {
                        id: row.id || `f${index + 1}`,
                        author: {
                            name: row.authorName || '',
                            handle: row.authorHandle || '',
                            verified: row.isVerified === 'TRUE'
                        },
                        content: row.content || '',
                        isTrue: isTrue,
                        topic: row.topic || '',
                        newsURL: row.newsURL || '',
                        interactions: {
                            likes: parseInt(row.likes) || 0,
                            comments: parseInt(row.comments) || 0,
                            reposts: parseInt(row.reposts) || 0
                        },
                        timestamp: row.timestamp || '',
                        engagementLevel: (row.engagementLevel?.toLowerCase() === 'high' ? 'high' : 'low') as EngagementLevel
                    };

                    // For true news, set warning type to 'analytical' but empty warning messages
                    if (isTrue) {
                        return {
                            ...basePost,
                            warningType: 'analytical' as WarningType,
                            analyticalWarning: '',
                            emotionalWarning: ''
                        };
                    }

                    // For false news, use warning type and corresponding message from the dataset
                    const warningType = (row.warningType?.toLowerCase() === 'emotional' ? 'emotional' : 'analytical') as WarningType;

                    // Get the warning message based on the warning type
                    const warningMessage = row.warningMessage || '';

                    return {
                        ...basePost,
                        warningType: warningType,
                        analyticalWarning: warningType === 'analytical' ? warningMessage : '',
                        emotionalWarning: warningType === 'emotional' ? warningMessage : ''
                    };
                });

                resolve(posts);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => reject(error);

        // Read Excel file as binary
        reader.readAsBinaryString(file);
    });
}; 