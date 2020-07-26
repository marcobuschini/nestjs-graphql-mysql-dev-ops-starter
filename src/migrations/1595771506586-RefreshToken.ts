import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class RefreshToken1595771506586 implements MigrationInterface {
  private refreshTokenTable = new Table({
    name: 'refresh_token',
    columns: [
      {
        name: 'refreshToken',
        type: 'varchar(255)',
        isPrimary: true,
      },
      {
        name: 'userId',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'expiresAt',
        type: 'timestamp',
        isNullable: false,
      },
    ],
    foreignKeys: [
      {
        columnNames: ['userId'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
      },
    ],
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.refreshTokenTable)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.refreshTokenTable)
  }
}
