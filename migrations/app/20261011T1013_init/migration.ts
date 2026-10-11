#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/3199a7a6f2ab601a5c057b089ff7d2ad3df78c3786fe311c4d0d70cd2e6bf817/contract';
import endContract from '../../snapshots/3199a7a6f2ab601a5c057b089ff7d2ad3df78c3786fe311c4d0d70cd2e6bf817/contract.json' with { type: 'json' };
import {
	Migration,
	MigrationCLI,
	checkExpression,
	col,
	lit,
	primaryKey
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
	override readonly endContractJson = endContract;

	override get operations() {
		return [
			this.createSchema({ schema: 'public' }),
			this.createTable({
				schema: 'public',
				table: 'CommandLog',
				columns: [
					col('command', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
					col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
					col('robloxUserId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
					col('timestamp', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
					col('userId', 'int4', { codecRef: { codecId: 'pg/int4@1' } })
				],
				constraints: [primaryKey(['id'])]
			}),
			this.createTable({
				schema: 'public',
				table: 'ModCall',
				columns: [
					col('callerId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
					col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
					col('moderatorId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
					col('timestamp', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } })
				],
				constraints: [primaryKey(['id'])]
			}),
			this.createTable({
				schema: 'public',
				table: 'Player',
				columns: [
					col('Callsign', 'text', { codecRef: { codecId: 'pg/text@1' } }),
					col('Permissions', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
					col('WantedStars', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
					col('location', 'jsonb', { notNull: true, codecRef: { codecId: 'pg/jsonb@1' } }),
					col('robloxId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
					col('robloxUsername', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
					col('team', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } })
				]
			}),
			this.createTable({
				schema: 'public',
				table: 'User',
				columns: [
					col('discordID', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
					col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
					col('passwordHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
					col('robloxID', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
					col('role', 'text', {
						notNull: true,
						default: lit('USER'),
						codecRef: { codecId: 'pg/text@1' }
					})
				],
				constraints: [
					primaryKey(['id']),
					checkExpression(
						'User_role_check_866f1f61',
						`"role" IN ('OWNER', 'ADMINISTRATOR', 'MODERATOR', 'USER')`
					)
				]
			}),
			this.createTable({
				schema: 'public',
				table: 'Vehicle',
				columns: [
					col('ColorHex', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
					col('ColorName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
					col('Name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
					col('Owner', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
					col('Plate', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
					col('Texture', 'text', { codecRef: { codecId: 'pg/text@1' } })
				]
			}),
			this.addUnique({
				schema: 'public',
				table: 'CommandLog',
				constraint: 'CommandLog_timestamp_key',
				columns: ['timestamp']
			}),
			this.addUnique({
				schema: 'public',
				table: 'ModCall',
				constraint: 'ModCall_timestamp_key',
				columns: ['timestamp']
			}),
			this.addUnique({
				schema: 'public',
				table: 'Player',
				constraint: 'Player_robloxId_key',
				columns: ['robloxId']
			}),
			this.addUnique({
				schema: 'public',
				table: 'Player',
				constraint: 'Player_robloxUsername_key',
				columns: ['robloxUsername']
			}),
			this.addUnique({
				schema: 'public',
				table: 'Player',
				constraint: 'Player_Callsign_key',
				columns: ['Callsign']
			}),
			this.addUnique({
				schema: 'public',
				table: 'User',
				constraint: 'User_robloxID_key',
				columns: ['robloxID']
			}),
			this.addUnique({
				schema: 'public',
				table: 'User',
				constraint: 'User_discordID_key',
				columns: ['discordID']
			})
		];
	}
}

MigrationCLI.run(import.meta.url, M);
