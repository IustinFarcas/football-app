import { Fixture } from './fixture.interface';

export interface FixtureResponse {
  errors: Object;
  results: number;
  response: Fixture[];
}
