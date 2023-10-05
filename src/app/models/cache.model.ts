export class CacheModel<Type> {
  constructor(
    public leagueId: number,
    public lastCacheUpdate: Date,
    public data: Type[]
  ) {}
}
