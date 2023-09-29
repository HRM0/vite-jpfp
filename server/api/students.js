import express from 'express';
import Campus from '../db/campus.js';
import Student from '../db/student.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
      const allStudents = await Student.findAll({
        include:[Campus]
      })
      res.send(allStudents)
    } catch (err) {
      res.status(500).send(err)
    }
  })

  export default router