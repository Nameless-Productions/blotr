import { env } from '$env/dynamic/private';
import type { ERLCplayer } from '../types/player';

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
	OwnerId: number;
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
		Player: string;
	}[];
	Queue?: number[];
	KillLogs?: {
		Killed: string;
		Timestamp: number;
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
	};
}

export async function getServerInfo(params: GetServerInfoParams) {
	if (!env.SERVER_KEY) throw new Error('No SERVER_KEY env');

	const url = new URL('/v2/server', 'https://api.erlc.gg');

	for (const [key, value] of Object.entries(params)) {
		if (value) url.searchParams.set(key, 'true');
	}

	const res = await fetch(url, {
		headers: {
			'server-key': env.SERVER_KEY
		}
	});

	if (res.status != 200) {
		throw new Error(`Error with erlc api: ${res.status}`);
	}

	const body = (await res.json()) as GetServerInfoRes;

	return body;
}
