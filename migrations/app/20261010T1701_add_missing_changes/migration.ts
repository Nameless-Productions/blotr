#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/3a27be351ac333f9e5f79aae85e1772b30a258ec922edb10b2723075922ec6a9/contract';
import endContract from '../../snapshots/3a27be351ac333f9e5f79aae85e1772b30a258ec922edb10b2723075922ec6a9/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/a1fdac8c086420d7c3e74db2523610926b1c3b433447fa85de459985bd5cc31c/contract';
import startContract from '../../snapshots/a1fdac8c086420d7c3e74db2523610926b1c3b433447fa85de459985bd5cc31c/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
	override readonly startContractJson = startContract;
	override readonly endContractJson = endContract;

	override get operations() {
		return [
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
			})
		];
	}
}

MigrationCLI.run(import.meta.url, M);
