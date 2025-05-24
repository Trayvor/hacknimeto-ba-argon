import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const parseIdToken = (idToken: string) => {
    if (!idToken) {
        throw new Error('Invalid token');
    }

    const tokenParts = idToken.split('.');

    if (tokenParts.length !== 3) {
        throw new Error('Invalid token structure');
    }

    try {
        const payload = atob(tokenParts[1]);

        return JSON.parse(payload);
    } catch (error) {
        throw new Error('Failed to parse token payload');
    }
};

export function capitalizeFirstLetter(word: string): string {
    if (word.length === 0) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
}
