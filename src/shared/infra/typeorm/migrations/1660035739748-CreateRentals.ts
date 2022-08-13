import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRentals1660035739748 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'rentals',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'car_id', type: 'uuid' },
          { name: 'user_id', type: 'uuid' },
          { name: 'start_date', type: 'timeStamp', default: 'now()' },
          { name: 'end_date', type: 'timeStamp' },
          { name: 'expected_return_date', type: 'timeStamp' },
          { name: 'total', type: 'numeric' },
          { name: 'created_at', type: 'timeStamp', default: 'now()' },
          { name: 'updated_at', type: 'timeStamp', default: 'now()' },
        ],
        foreignKeys: [
          {
            name: 'FKCarRental',
            referencedTableName: 'cars',
            referencedColumnNames: ['id'],
            columnNames: ['car_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKCarUserRental',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rentals');
  }
}
