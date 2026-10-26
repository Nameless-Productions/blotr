#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/3199a7a6f2ab601a5c057b089ff7d2ad3df78c3786fe311c4d0d70cd2e6bf817/contract';
import startContract from '../../snapshots/3199a7a6f2ab601a5c057b089ff7d2ad3df78c3786fe311c4d0d70cd2e6bf817/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/ace7242573fb0f52248b4c83467eb0b98cceef0c9f887bf3e42b5a3eed3a7f5f/contract';
import endContract from '../../snapshots/ace7242573fb0f52248b4c83467eb0b98cceef0c9f887bf3e42b5a3eed3a7f5f/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
	override readonly startContractJson = startContract;
	override readonly endContractJson = endContract;

	override get operations() {
		return [
			this.addColumn({
				schema: 'public',
				table: 'User',
				column: col('discordUsername', 'text', { codecRef: { codecId: 'pg/text@1' } })
			}),
			this.addColumn({
				schema: 'public',
				table: 'User',
				column: col('robloxUsername', 'text', { codecRef: { codecId: 'pg/text@1' } })
			}),
			this.addColumn({
				schema: 'public',
				table: 'CommandLog',
				column: col('robloxUsername', 'text', { codecRef: { codecId: 'pg/text@1' } })
			}),
			this.dataTransform(endContract, 'backfill-CommandLog-robloxUsername', {
				check: () => placeholder('backfill-CommandLog-robloxUsername:check'),
				run: () => placeholder('backfill-CommandLog-robloxUsername:run')
			}),
			this.setNotNull({ schema: 'public', table: 'CommandLog', column: 'robloxUsername' })
		];
	}
}

MigrationCLI.run(import.meta.url, M);
