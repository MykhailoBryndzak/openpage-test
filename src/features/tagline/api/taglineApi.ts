import type { TaglineData } from '../types';

const API_BASE = 'http://api';

export const taglineApi = {
  save(data: TaglineData): void {
    console.log(`POST ${API_BASE}/tagline`, data);
  },

  async fetch(): Promise<TaglineData | null> {
    console.log(`GET ${API_BASE}/tagline`);
    return null;
  },
};
