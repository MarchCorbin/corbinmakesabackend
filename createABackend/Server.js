const mountains = require('./mountains-data')
const express = require('express')
const app = express()
app.use(express.json())
app.set('port', 3002)

app.locals.title ='The Best 14ers in CO'
app.locals.mountains = mountains.mountains

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is up and running on ${app.get('port')}, are you some sort of genius or sumthing?`)
})

app.get('/api/v1/mountains', (req, res) => {
  res.status(200).json({mountains: app.locals.mountains})
})

app.get('/api/v1/mountains/:id', (req, res) => {
  const id = req.params.id
  const specMount = app.locals.mountains.find(mountain => mountain.id === id)
  if(!specMount) {
    res.status(404).json({error: `No such ${id} mountain exists on this list must be a bad mountain`})
  }
  response.status(200).json({specMount})
})

app.post('/api/v1/mountains', (req, res) => {
  const required = ['name', 'elevation', 'range']
  for (let property of required) {
    if(!req.body[property]) {
      return res.status(422).json({error: `Unsuccessful POST Property ${property} needs to be included`})
    }
  }
  const { name, elevation, range } = req.body
  const id = Date.now()
  const newMountain = { id, name, elevation, range }
  app.locals.mountains.push(newMountain)
  res.status(201).json(newMountain)
})

app.delete('api/v1/mountains/:id', (req, res) => {
  const id = req.params.id
  const mountDelete = app.locals.mountains.find(mountain => mountain.id === id)
  if(!mountDelete) {
    return res.status(404).json({error: `Sorry cant find a mountain with the id of ${id}`})
  }
  app.locals.mountains = app.locals.mountains.filter(mountain => mountain.id !== id)
  response.status(200).json(mountDelete)
})