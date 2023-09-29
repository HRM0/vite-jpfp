import { Sequelize } from 'sequelize';


const db = new Sequelize(`postgres://localhost:5432/students`, {
  logging: false,
});

export default db;