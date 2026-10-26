#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/3199a7a6f2ab601a5c057b089ff7d2ad3df78c3786fe311c4d0d70cd2e6bf817/contract';
import startContract from '../../snapshots/3199a7a6f2ab601a5c057b089ff7d2ad3df78c3786fe311c4d0d70cd2e6bf817/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/7b42d240a373af45e445c73ee8cfe4a556180bb1725edc74767400b944d535db/contract';
import endContract from '../../snapshots/7b42d240a373af45e445c73ee8cfe4a556180bb1725edc74767400b944d535db/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';
import postgres from '@prisma/orm-postgres/runtime';

const { sql: db, contract } = postgres<End>({ contractJson: endContract });

export default class M extends Migration<Start, End> {
	override readonly startContractJson = startContract;
	override readonly endContractJson = endContract;

	override get operations() {
		return [
			this.addColumn({
				schema: 'public',
				table: 'CommandLog',
				column: col('robloxUsername', 'text', { codecRef: { codecId: 'pg/text@1' } })
			}),
			this.dataTransform(contract, 'backfill-CommandLog-robloxUsername', {
				check: () =>
					db.public.CommandLog.select('timestamp')
						.where((f, fns) => fns.eq(f.robloxUsername, null))
						.limit(1),
				run: () =>
					db.public.CommandLog.update({ robloxUsername: '' }).where((f, fns) =>
						fns.eq(f.robloxUsername, null)
					)
			}),
			this.setNotNull({ schema: 'public', table: 'CommandLog', column: 'robloxUsername' })
		];
	}
}

MigrationCLI.run(import.meta.url, M);
