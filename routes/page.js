const express = require('express')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
const { Post, User } = require('../models')
const router = express.Router()

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: 'NodeBird', user: req.user })
})

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: 'join - NodeBird',
    user: req.user,
    joinError: req.flash('joinError')
  })
})

router.get('/', (req, res, next) => {
  Post.findAll({
    include: [{
      model: User,
      attributes: ['id', 'nick'],

    }, {
      model: User,
      attributes: ['id', 'nick'],
      as: 'Liker',
    }]

  })
    .then((posts) => {
      res.render('main', {
        title: 'NodeBird',
        twits: posts,
        user: req.user,
        loginError: req.flash('loginError'),
      })
    })
    .catch((error) => {
      console.error(error)
      next(error)
    })
})

router.get('/main', (req, res, next) => {
  Post.findAll({
    include: {
      model: User,
      attributes: ['id', 'nick'],
    },
    order: [['createdAt', 'DESC']],
  })
    .then((posts) => {
      res.render('main', {
        title: 'NodeBird',
        twits: posts,
        user: req.user,
        loginError: req.flash('loginError'),
      })
    })
    .catch((error) => {
      console.error(error)
      next(error)
    })
})
module.exports = router