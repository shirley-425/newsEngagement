import { ExperimentData, ParticipantResponse, Post } from '../types';

// Local Storage Implementation
export class LocalStorageService {
    private readonly STORAGE_KEY = 'experiment_responses';
    private readonly BACKUP_KEY = 'experiment_responses_backup';
    private readonly DATASET_KEY = 'experiment_dataset';

    saveResponse(data: ExperimentData): void {
        try {
            const existingData = this.getAllResponses();
            existingData.push(data);

            // Save to main storage
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingData));

            // Create backup
            localStorage.setItem(this.BACKUP_KEY, JSON.stringify(existingData));

            // Save to IndexedDB for additional backup
            this.saveToIndexedDB(data);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            throw new Error('Failed to save response');
        }
    }

    getAllResponses(): ExperimentData[] {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (!data) {
                // Try to recover from backup if main data is missing
                const backup = localStorage.getItem(this.BACKUP_KEY);
                return backup ? JSON.parse(backup) : [];
            }
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return [];
        }
    }

    private async saveToIndexedDB(data: any) {
        try {
            const request = indexedDB.open('ExperimentDB', 1);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains('responses')) {
                    db.createObjectStore('responses', { keyPath: 'participantId' });
                }
            };

            request.onsuccess = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                const transaction = db.transaction(['responses'], 'readwrite');
                const store = transaction.objectStore('responses');
                store.put(data);
            };
        } catch (error) {
            console.error('Error saving to IndexedDB:', error);
        }
    }

    exportToCSV(): void {
        const data = this.getAllResponses();
        if (data.length === 0) return;

        // Flatten the data for CSV format with only required fields
        const flattenedData = data.flatMap(experiment =>
            experiment.responses.map(response => ({
                participantId: experiment.participantId,
                postId: response.postId,
                warningType: response.warningType,
                engagementLevel: response.engagementLevel,
                decision: response.decision,
                timestamp: response.timestamp
            }))
        );

        // Convert to CSV
        const headers = Object.keys(flattenedData[0]);
        const csvContent = [
            headers.join(','),
            ...flattenedData.map(row =>
                headers.map(header => JSON.stringify(row[header as keyof typeof row])).join(',')
            )
        ].join('\n');

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `experiment_responses_${new Date().toISOString()}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    exportToJSON(): void {
        const data = this.getAllResponses();
        if (data.length === 0) return;

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `experiment_responses_${new Date().toISOString()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    clearAllData(): void {
        localStorage.removeItem(this.STORAGE_KEY);
        localStorage.removeItem(this.BACKUP_KEY);

        // Clear IndexedDB
        const request = indexedDB.deleteDatabase('ExperimentDB');
        request.onerror = () => {
            console.error('Error deleting IndexedDB database');
        };
    }

    saveDataset(posts: Post[]) {
        try {
            localStorage.setItem(this.DATASET_KEY, JSON.stringify(posts));
        } catch (error) {
            console.error('Error saving dataset:', error);
            throw new Error('Failed to save dataset');
        }
    }

    getDataset(): Post[] | null {
        try {
            const dataset = localStorage.getItem(this.DATASET_KEY);
            return dataset ? JSON.parse(dataset) : null;
        } catch (error) {
            console.error('Error retrieving dataset:', error);
            return null;
        }
    }

    clearDataset() {
        try {
            localStorage.removeItem(this.DATASET_KEY);
        } catch (error) {
            console.error('Error clearing dataset:', error);
            throw new Error('Failed to clear dataset');
        }
    }
}

// Firebase Implementation (if needed)
export class FirebaseService {
    // Add Firebase implementation here if requested
} 