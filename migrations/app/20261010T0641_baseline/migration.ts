#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/275d993b04985d6da0fb2c8103c8bf9545aa0b449842e73afc06ac7fdc0e6fd9/contract';
import endContract from '../../snapshots/275d993b04985d6da0fb2c8103c8bf9545aa0b449842e73afc06ac7fdc0e6fd9/contract.json' with { type: 'json' };
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
					col('timestamp', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
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
					col('timestamp', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } })
				],
				constraints: [primaryKey(['id'])]
			}),
			this.createTable({
				schema: 'public',
				table: 'User',
				columns: [
					col('discordID', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
					col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
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
