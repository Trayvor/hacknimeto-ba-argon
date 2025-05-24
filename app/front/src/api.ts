import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8000'
});

export type UtilityHistoryEntry = {
    month: string;
    electricity: number;
    water: number;
    heating: number;
};

export const getHistoryData = async (): Promise<UtilityHistoryEntry[]> => {
    try {
        const response = await api.get<UtilityHistoryEntry[]>('/history');
        return response.data;
    } catch (error) {
        console.error('Error fetching history:', error);
        throw error;
    }
};

export type CurrentUtilityData = {
    electricity: number;
    water: number;
    heating: number;
};

export const getCurrentData = async (): Promise<CurrentUtilityData> => {
    try {
        const response = await api.get<CurrentUtilityData>('/current');
        return response.data;
    } catch (error) {
        console.error('Error fetching current data:', error);
        throw error;
    }
};

export const getInsightsData = async (): Promise<string[]> => {
    try {
        const response = await api.get<string[]>('/insights');
        return response.data;
    } catch (error) {
        console.error('Error fetching insights:', error);
        throw error;
    }
};
