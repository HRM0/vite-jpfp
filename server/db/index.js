import db from './database.js';
import Campus from './campus.js';
import Student from './student.js';

// This is a great place to establish associations between your models
// (https://sequelize-guides.netlify.com/association-types/).
// Example:
//
// Puppy.belongsTo(Owner)

Student.belongsTo(Campus);
Campus.hasMany(Student, { foreignKey: 'campusId' });

export {
  // Include your models in this exports object as well!
  db,
  Campus,
  Student,
};