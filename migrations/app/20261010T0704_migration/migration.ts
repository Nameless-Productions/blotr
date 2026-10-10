#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/275d993b04985d6da0fb2c8103c8bf9545aa0b449842e73afc06ac7fdc0e6fd9/contract';
import startContract from '../../snapshots/275d993b04985d6da0fb2c8103c8bf9545aa0b449842e73afc06ac7fdc0e6fd9/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/a1fdac8c086420d7c3e74db2523610926b1c3b433447fa85de459985bd5cc31c/contract';
import endContract from '../../snapshots/a1fdac8c086420d7c3e74db2523610926b1c3b433447fa85de459985bd5cc31c/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dataTransform(endContract, 'typechange-CommandLog-timestamp', {
        check: () => placeholder('typechange-CommandLog-timestamp:check'),
        run: () => placeholder('typechange-CommandLog-timestamp:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'CommandLog',
        column: 'timestamp',
        options: {
          qualifiedTargetType: 'int4',
          formatTypeExpected: 'integer',
          rawTargetTypeForLabel: 'int4',
        },
      }),
      this.dataTransform(endContract, 'typechange-ModCall-timestamp', {
        check: () => placeholder('typechange-ModCall-timestamp:check'),
        run: () => placeholder('typechange-ModCall-timestamp:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'ModCall',
        column: 'timestamp',
        options: {
          qualifiedTargetType: 'int4',
          formatTypeExpected: 'integer',
          rawTargetTypeForLabel: 'int4',
        },
      }),
      this.addUnique({
        schema: 'public',
        table: 'CommandLog',
        constraint: 'CommandLog_timestamp_key',
        columns: ['timestamp'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'ModCall',
        constraint: 'ModCall_timestamp_key',
        columns: ['timestamp'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
