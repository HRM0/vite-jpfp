import express from 'express';
import Campus from '../db/campus.js';
import Student from '../db/student.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
      const allCampuses = await Campus.findAll({
        include:[Student]
      })
      res.send(allCampuses)
    } catch (err) {
      next(err)
    }
  })

  export default router