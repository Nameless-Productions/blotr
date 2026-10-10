#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/275d993b04985d6da0fb2c8103c8bf9545aa0b449842e73afc06ac7fdc0e6fd9/contract';
import endContract from '../../snapshots/275d993b04985d6da0fb2c8103c8bf9545aa0b449842e73afc06ac7fdc0e6fd9/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [];
  }
}

MigrationCLI.run(import.meta.url, M);
