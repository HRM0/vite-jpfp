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
  
router.post('/', async (req, res, next) => {
  try {
    const {firstName, lastName, email, gpa, imageUrl, campus} = req.body
    const newStudent = await Student.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      gpa: gpa,
      imageUrl: imageUrl,
      campus: campus,
  })
    res.send(newStudent)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    console.log("in route")
    const [didUpdate,singleStudent] = await Student.update(req.body,{
      where:{
        id:req.params.id
      },
      returning: true,
      plain: true
    })
    res.send(await Student.findByPk(req.params.id, {
      include:[Campus]
    }))
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const singleStudent = await Student.destroy({
      where:{
        id:req.params.id
      }
  })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

export default router