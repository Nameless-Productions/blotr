import {env} from "$env/dynamic/private"
import type { ERLCplayer } from "../types/player";

interface GetServerInfoParams {
    Players?: boolean;
    Staff?: boolean;
    JoinLogs?: boolean;
    Queue?: boolean;
    KillLogs?: boolean;
    CommandLogs?: boolean;
    ModCalls?: boolean;
    EmergencyCalls?: boolean;
    Vehicles?: boolean;
}

interface GetServerInfoRes {
    Name: string;
    OwnerId: number,
    CoOwnerIds: number[];
    CurrentPlayers: number;
    MaxPlayers: number;
    JoinKey: string;
    AccVerifiedReq: string;
    TeamBalance: boolean;
    Players?: ERLCplayer[];
    Staff?: any;
    JoinLogs?: {
        Join: boolean;
        Timestamp: number;
        Player: string
    }[];
    Queue?: number[];
    KillLogs?: {
        Killed: string;
        Timestamp: number
        Killer: string;
    }[];
    CommandLogs?: {
        Player: string;
        Timestamp: number;
        Command: string;
    }[];
    ModCalls?: {
        Caller: string;
        Moderator?: string;
        Timestamp: number;
    }[];
    EmergencyCalls?: {
        Team: string;
        Caller: number;
        Players: number[];
        Position: number[];
        StartedAt: number;
        CallNumber: number;
        Description: string;
        PositionDescriptor: string;
    };
    Vehicles?: {
        Name: string;
        Owner: string;
        Plate: string;
        Texture?: string;
        ColorHex: string;
        ColorName: string;
    }
}

export async function getServerInfo() {
    
}