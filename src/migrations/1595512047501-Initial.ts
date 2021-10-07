import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Initial1595512047501 implements MigrationInterface {
  private userTable = new Table({
    name: 'user',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isGenerated: true,
        isPrimary: true,
      },
      {
        name: 'firstName',
        type: 'varchar(255)',
      },
      {
        name: 'lastName',
        type: 'varchar(255)',
      },
      {
        name: 'username',
        type: 'varchar(255)',
      },
      {
        name: 'password',
        type: 'varchar(255)',
      },
      {
        name: 'salt',
        type: 'varchar(255)',
      },
      {
        name: 'isActive',
        type: 'boolean',
      },
      {
        name: 'createdAt',
        type: 'timestamp',
      },
      {
        name: 'updatedAt',
        type: 'timestamp',
      },
    ],
  })

  private catTable = new Table({
    name: 'cat',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isGenerated: true,
        generationStrategy: 'increment',
        isPrimary: true,
      },
      {
        name: 'name',
        type: 'varchar(255)',
      },
      {
        name: 'age',
        type: 'integer',
      },
    ],
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.userTable)
    await queryRunner.createTable(this.catTable)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.userTable)
    await queryRunner.dropTable(this.catTable)
  }
}
