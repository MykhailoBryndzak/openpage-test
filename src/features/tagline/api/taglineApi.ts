import type { TaglineData } from '../types';

export interface TaglinePersistence {
  fetch(): TaglineData | null;
  save(data: TaglineData): void;
}

export type SaveErrorCode = 'quota_exceeded' | 'storage_unavailable' | 'unknown';

export const SAVE_ERROR_MESSAGES: Record<SaveErrorCode, string> = {
  quota_exceeded: 'Storage limit reached. Try removing some items.',
  storage_unavailable: 'Storage is not available. Changes may not be saved.',
  unknown: 'Failed to save. Your changes may not be persisted.',
};

const STORAGE_KEY = 'tagline_data';

function getSaveErrorMessage(error: unknown): SaveErrorCode {
  if (error instanceof DOMException) {
    if (error.name === 'QuotaExceededError') return 'quota_exceeded';
    if (error.name === 'SecurityError' || error.name === 'InvalidStateError') return 'storage_unavailable';
  }
  return 'unknown';
}

export const taglineApi: TaglinePersistence = {
  save(data: TaglineData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log('POST http://api/tagline', data);
    } catch (error) {
      console.error('Failed to save tagline data to localStorage:', error);
      throw { code: getSaveErrorMessage(error), original: error };
    }
  },

  fetch(): TaglineData | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;

      const parsed: unknown = JSON.parse(raw);

      if (
        typeof parsed === 'object' &&
        parsed !== null &&
        'items' in parsed &&
        'styles' in parsed &&
        Array.isArray((parsed as TaglineData).items)
      ) {
        return parsed as TaglineData;
      }

      return null;
    } catch (error) {
      console.error('Failed to read tagline data from localStorage:', error);
      return null;
    }
  },
};
