export type PlayerPosition = 'GK' | 'DF' | 'MF' | 'FW';
export type PreferredFoot = 'RIGHT' | 'LEFT' | 'BOTH' | 'UNKNOWN';
export type Player = { playerId: string; name: string; nameEn: string; number: number; position: PlayerPosition; dateOfBirth: string; height: number; weight: number; preferredFoot: PreferredFoot; nationality: string; imagePath: string; active: boolean };
