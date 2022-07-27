import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableCarNameCreatedAt1658829378139
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE cars RENAME COLUMN create_at to created_at',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE cars RENAME COLUMN create_at to created_at',
    );
  }
}
