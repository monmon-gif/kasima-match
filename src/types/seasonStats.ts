export type RecordStats = { matches: number; wins: number; draws: number; losses: number; points: number; goalsFor: number; goalsAgainst: number; goalDifference: number };
export type SeasonStats = RecordStats & { season: number; home: RecordStats; away: RecordStats };
