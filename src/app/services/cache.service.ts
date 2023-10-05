import { Injectable } from '@angular/core';
import { CacheModel } from '../models/cache.model';
import { addHours } from '../utils';

@Injectable({ providedIn: 'root' })
export class CacheService {
  writeToCache<Type>(data: Type, key: string): void {
    localStorage.removeItem(key);
    const standingJson = JSON.stringify(data);
    localStorage.setItem(key, standingJson);
  }

  readFromCache<Type>(key: string): Type | null {
    const standingsJson = localStorage.getItem(key);
    if (standingsJson) return JSON.parse(standingsJson);
    return null;
  }

  needsRefresh<Type>(key: string): boolean {
    if (!this.hasKey(key)) return true;
    if (this.isExpired<Type>(key)) return true;
    return false;
  }

  private hasKey(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  private isExpired<Type>(key: string): boolean {
    const data = this.readFromCache(key) as CacheModel<Type>;
    return addHours(data.lastCacheUpdate, 3) < new Date();
  }
}
