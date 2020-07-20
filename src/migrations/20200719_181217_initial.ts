import { QueryInterface } from 'sequelize'
import { INTEGER, STRING, BOOLEAN, DATE, NUMBER } from 'sequelize'

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('user', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING(255),
      allowNull: false,
    },
    firstName: {
      type: STRING(255),
      allowNull: true,
    },
    lastName: {
      type: STRING(255),
    },
    isActive: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DATE,
      allowNull: false,
    },
  })

  await queryInterface.createTable('cat', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(255),
      allowNull: false,
    },
    age: {
      type: NUMBER,
      allowNull: false,
    },
    createdAt: {
      type: DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DATE,
      allowNull: false,
    },
  })
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('user')
  await queryInterface.dropTable('cat')
}
