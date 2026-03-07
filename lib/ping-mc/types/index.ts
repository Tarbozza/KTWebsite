// This file exports various TypeScript interfaces and types used throughout the project, enhancing type safety.

import dgram from 'dgram';

export interface PingResponse {
    rinfo: dgram.RemoteInfo;
    advertise: string;
    serverId: number;
    pingId: number;
    game: string;
    version: string;
    name: string;
    cleanName: string;
    currentPlayers: string;
    maxPlayers: string;
    ackId: number;
    connected: boolean;
}

export interface QueryResponse {
    rinfo: dgram.RemoteInfo;
    hostname: string;
    gametype: string;
    game: string;
    version: string;
    serverEngine: string;
    plugins: string;
    map: string;
    currentPlayers: string;
    maxPlayers: string;
    whitelist: boolean;
    hostIp: string;
    hostPort: string;
    ackId: number;
    players: string[];
    connected: boolean;
}

export interface PingError {
    error: boolean;
    description: string;
}

export type PingCallback = (err: PingError | null, res?: PingResponse | QueryResponse) => void;

export interface ClientData {
    rinfo: any; // Replace with appropriate type for remote info
    hostname: string;
    gametype: string;
    game: string;
    version: string;
    serverEngine: string;
    plugins: string;
    map: string;
    currentPlayers: string;
    maxPlayers: string;
    whitelist: boolean;
    hostIp: string;
    hostPort: string;
    ackId: number;
    players: string[];
    connected: boolean;
}

export interface UnconnectedPongData {
    pingId: number;
    serverId: number;
    advertiseString: string;
    gameId: string;
    name: string;
    unknownId: string;
    gameVersion: string;
    currentPlayers: string;
    maxPlayers: string;
}

export interface ChallengeResponseData {
    clientId: number;
    challengeToken: number;
}

export interface StatResponseData {
    data: Record<string, string>;
    players: string[];
}