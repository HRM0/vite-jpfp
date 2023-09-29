import express from 'express';
import Campus from '../db/campus.js';
import Student from '../db/student.js';
import campusesRouter from './campuses.js';
import studentsRouter from './students.js';

const router = express.Router();

router.use('/campuses', campusesRouter);
router.use('/students', studentsRouter);

router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

export default router;
