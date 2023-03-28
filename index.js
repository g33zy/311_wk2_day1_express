
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

app.use(express.json())

/* BEGIN - create routes here part 1 basic routes*/
app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/users/1', (req, res) => {
  console.log(' req.params.id', req.params.id)
  res.json(users.find((user) => user._id === 1))
})


// app.post('/users', (req, res) => {
//   const user = {
//     id: users.length + 1,
//     name: 'Slow Mobius',
//     occupation: 'Time Distorter',
//     avatar: "https://static.wikia.nocookie.net/rickandmorty/images/d/d9/Slowmobius.jpg/revision/latest?cb=20151227062305"
//   }
//   users.push(user);
//   res.json(user)
// })

app.put('/users/1', (req, res) => {
  let updatedRow = users.find((user) => user._id === 1)
  const index = users.indexOf(updatedRow) 
  let updatedUser = {
    ...updatedRow,
    ...req.body,
  }

  users.splice(index, 1, updatedUser)
  res.json(updatedUser)

})

// hard-coded
// users[0].name = 'spike'
// res.json(users[0])


// dynamic, used more often

// app.delete('/users/:id', (req, res) => {
//   let updatedRow = users.find((user) => user._id === parseInt(req.params.id))
//   let index = users.indexOf(updatedRow)
//   users.splice(index, 1)
//   res.send('deleted')
// })

// hard coded
app.delete('/users/1', (req, res) => {
  let updatedRow = users.find((user) => user._id === 1)
  let index = users.indexOf(updatedRow)
  users.splice(index, 1)
  res.send('deleted')
})


// part 2 body parser module

// app.post('/users', (req, res) => {
//   const user = {
//     id: users.length + 1,
//     ...req.body
//   }
//   users.push(user);
//   res.json(user)
// })


// Part 3

app.get('/users/:userId', (req, res) => {
  res.json(users.find((user) => user._id === parseInt(req.params.userId)))
})

app.put('/users/:userId', (req, res) => {
  const updatedRow = users.find((user) => user._id === parseInt(req.params.userId))
  const index = users.indexOf(updatedRow)
  const updatedUser = {
    ...updatedRow,
    ...req.body,
  }
  users.splice(index, 1, updatedUser)
  res.json(updatedUser)
})

app.delete('/users/:userId', (req, res) => {
 const updatedRow = users.find((user) => user._id === parseInt(req.params.userId))
 const index = users.indexOf(updatedRow)
 updatedRow.isActive = 'false'
 res.send('deleted')
})





// users = users.map(user => {
//   if(user._id === parseInt(req.params.id)) {
//     return {
//       _id: parseInt(req.params.id),
//       ...req.body
//     }
//   }
// })




/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))