import { LeaguesEnum } from './models/leagues.enum';

export const addHours = (date: Date, nrOfHours: number): Date => {
  const validDateObj = new Date(date);
  return new Date(
    validDateObj.setTime(validDateObj.getTime() + nrOfHours * 60 * 60 * 1000)
  );
};

export const leagueIdToLeagueName: { [leagueId: number]: string } = {
  [LeaguesEnum.england]: 'Premier League',
  [LeaguesEnum.spain]: 'LaLiga',
  [LeaguesEnum.germany]: 'Bundesliga',
  [LeaguesEnum.france]: 'Ligue 1',
  [LeaguesEnum.italy]: 'Serie A',
};

export const allowedLeagueIds = [
  LeaguesEnum.england,
  LeaguesEnum.spain,
  LeaguesEnum.germany,
  LeaguesEnum.france,
  LeaguesEnum.italy,
];
