import { v5 as uuid } from "https://deno.land/std/uuid/mod.ts";

// https://api.nfl.com/docs/league/models/game/index.html
export interface GameRecord {
    readonly week: Week;
    readonly gameTime: Date;
    readonly gameType: string;
    readonly visitorTeam: Team;
    readonly homeTeam: Team;
    readonly gameStatus: GameStatus;
    readonly homeTeamScore: GameScore;
    readonly visitorTeamScore: GameScore;
}

// https://api.nfl.com/docs/league/models/week/index.html
export interface Week {
    readonly season: number;
    readonly weekOrder: number;
    readonly seasonType: SeasonType;
    readonly week: number;
    // Whoa baby! Someone accounted for multiple weekTypes at once
    readonly weekType: [WeekType];
    readonly name: string;
}

// https://api.nfl.com/docs/league/models/seasonType/index.html
// GS: See WeekType, seems to just really merge post-season
// non-Super Bowl or special games into one field
export enum SeasonType {
    HOF = "Hall of Fame",
    PRE = "Pre-season",
    REG = "Regular Season",
    POST = "Post-season",
    PRO = "Pro Bowl",
    SB = "Super Bowl",
}

// https://api.nfl.com/docs/league/models/week/index.html
// {
//     "season": 2014,
//     "seasonType": "SB",
//     "week": 1,
//     "name": "Super Bowl"
// }
export enum WeekType {
    HOF = "Hall of Fame",
    PRE = "Non HOF Preseason",
    REG = "Regular Season",
    WC = "Wild Card",
    DIV = "Divisional Championship",
    CONF = "Conference Championship",
    SB = "Super Bowl",
    PRO = "Pro Bowl"
}

// https://api.nfl.com/docs/league/models/team/index.html
// {
//     "id" : "c239ece2-479d-49d8-8842-eb758ece5f46",
//     "fullName": "Indianapolis Colts",
//     "nickName": "Colts",
//     "conference": {
//         "abbr": "AFC",
//         "nickName": "AFC"
//     },
//     "division": {
//         "abbr": "ACS",
//         "nickName": "AFC South"
//     },
//     "abbr": "IND",
//     "city": "Indianapolis",
//     "venue": {
//       "id" : "b13bf128-57a7-4ef0-a701-c02fcc3045ca",
//       "name" : "Lucas Oil Staduim",
//       "location" : ""
//     },
//     "webDomain": "http://www.colts.com",
//     "established": 1953,
//     "isActive": true,
//     "standings": "see standings.json",
//     "remainingOpponentsString":"vs. Panthers (8-0), at Jaguars (2-6), vs. Raiders (4-4), vs. Jaguars (2-6), at Jets (5-3), at Patriots (8-0), vs. Texans (3-5), at Colts (4-5)"
// }
export interface Team {
    readonly id: uuid;
    // Teams are described by their season, or the year in which they existed.
    readonly season: number;
    // The team's long format name. ex. "Indianapolis Colts"_
    readonly fullName: string;
    // The team's nickname. ex. "Colts"
    readonly nickname: string;
    // The team's official two or three-letter abbreviation commonly used to fit displays like a scoreboard.,ex. "IND"_
    readonly abbr: string;
    readonly conference: Conference;
    readonly division: Division;
    readonly standings: Standings;
}

export interface Conference {
    readonly id: uuid;
    readonly season: number;
    readonly abbr: string;
    readonly nickName: string;
    readonly fullName: string;
}

export interface Division {
    readonly id: uuid;
    readonly season: number;
    readonly abbr: string;
    readonly nickName: string;
    readonly fullName: string;
}

// https://api.nfl.com/docs/league/models/standings/index.html#schema-instance
// GS: Not doing all the properties
export interface Standings {
    readonly overallWins:  number;
    readonly overallWinPct: number;
    readonly overallLosses: number;
    readonly overallTies: number;
    readonly overallRank: number;
}

// https://api.nfl.com/docs/league/models/gameStatus/index.html
export interface GameStatus {
    // game clock display
    // GS: String ("mm:ss")
    readonly gameClock: string;
    readonly down: number;
    readonly yardsToGo: string;
    // team abbreviation of the side of the field the ball in on
    readonly yardLineSide: string;
    // only the line number part of the yardsToGo
    readonly yardLineNumber: number,
    // quarter and overtime information in numeric value 1,2,3,4,5,6..
    // GS: OT will always be 5+
    readonly period: number,
    readonly scoringPlayType: ScoringPlayType;
    // GS: Pregame, OT, etc.
    readonly phase: Phase,
    readonly possessionTeamId: uuid,
    readonly redZone: boolean,
    // GS: If only Brodie Croyle had this!
    // https://www.youtube.com/watch?v=kDgFulxbwIk
    readonly homeTimeoutsRemaining: number,
    readonly visitorTimeoutsRemaining: number
}

export enum Phase {
    PREGAME,
    INGAME,
    HALFTIME,
    SUSPENDED,
    FINAL_OVERTIME
}

export enum ScoringPlayType {
    TD = "touchdown",
    FG = "field goal",
    PAT = "extra point kick",
    PAT2 = "2 point conversion",
    SFTY = "safety"
}

export interface GameScore {
    readonly pointsTotal: number;
    readonly pointsQ1: number;
    readonly pointsQ2: number;
    readonly pointsQ3: number;
    readonly pointsQ4: number;
    readonly pointsOvertime: [number];
}