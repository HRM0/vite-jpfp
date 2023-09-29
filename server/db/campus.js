import { DataTypes } from 'sequelize';
import db from './database.js';

const Campus = db.define('campus', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'campus needs a name!' }
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'campus needs an address!' }
    }
  },
  description: {
    type: DataTypes.TEXT
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: 'default_img_URL'
  }
});

export default Campus;