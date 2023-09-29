import { DataTypes } from 'sequelize';
import db from './database.js';

const Student = db.define('student', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'student needs a first name!' }
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'student needs a last name!' }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'student needs an email!' },
      isEmail: { msg: 'invalid email!' }
    }
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: 'default_img_URL'
  },
  gpa: {
    type: DataTypes.FLOAT,
    validate: {
      max: {
        args: [4.0],
        msg: "the gpa is too high, no one is that smart!"
      },
      min: {
        args: [0],
        msg: "0 is the lowest gpa can go, though they may try they can't get lower"
      }
    }
  }
});

export default Student;