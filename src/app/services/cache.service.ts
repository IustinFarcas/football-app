import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CacheService {
  standingsKey: string = 'standings';
  constructor() {}

  async writeToCache<Type>(data: Type, key: string): Promise<void> {
    localStorage.removeItem(key);
    const standingJson = JSON.stringify(data);
    localStorage.setItem(key, standingJson);
  }

  readFromCache<Type>(key: string): Type | null {
    const standingsJson = localStorage.getItem(key);
    if (standingsJson) return JSON.parse(standingsJson);
    return null;
  }
}
