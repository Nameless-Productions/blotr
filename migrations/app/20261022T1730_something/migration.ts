#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/7b42d240a373af45e445c73ee8cfe4a556180bb1725edc74767400b944d535db/contract';
import startContract from '../../snapshots/7b42d240a373af45e445c73ee8cfe4a556180bb1725edc74767400b944d535db/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/ace7242573fb0f52248b4c83467eb0b98cceef0c9f887bf3e42b5a3eed3a7f5f/contract';
import endContract from '../../snapshots/ace7242573fb0f52248b4c83467eb0b98cceef0c9f887bf3e42b5a3eed3a7f5f/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

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
			})
		];
	}
}

MigrationCLI.run(import.meta.url, M);
