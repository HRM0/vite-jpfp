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

router.post('/', async (req, res, next) => {
  try {
    const {name, address, description, imageUrl} = req.body
    const newCampus = await Campus.create({
      name: name,
      address: address,
      description: description,
      imageUrl: imageUrl,
      students:[]
  },
  {
    include:[Student]
  }
  )
  
    res.send(newCampus)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleCampus = await Campus.findByPk(req.params.id, {
      include:[Student]
    })
    if (singleCampus) {
      res.send(singleCampus)
    } else {
      res.status(404).send("campus not found!")
    }
  } catch (err) {
    res.status(404).send("whoa whoa, ok funny guy. I don't know what you're looking for, but it ain't here!!")
  }
})

router.get('/:id/removeStudent/:studentId', async (req, res, next) => {
  try {
    const singleCampus = await Campus.findByPk(req.params.id, {
      include:[Student]
    })
    const student = await Student.findByPk(req.params.studentId)
    singleCampus.removeStudent(student)
    res.send(singleCampus)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const singleCampus = await Campus.findByPk(req.params.id, {
      include:[Student]
    })
    res.send(await singleCampus.update(req.body))
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const singleCampus = await Campus.destroy({
      where:{
        id:req.params.id
      }
  })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

  export default router