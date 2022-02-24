const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(`Please provide arguments.\n
Usage:
node mongo.js <password>                   - to list all of the existing entries in phonebook
node mongo.js <password> <name> <number>   - to add a new entry to phonebook  `);
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://sheikhameen:${password}@cluster0.2ozrt.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person
    .find({})
    .then(persons => {
      console.log('phonebook:');
      persons.forEach(person => {
        console.log(person.name, person.number);
      })
      mongoose.connection.close()
    })
  return
}

const name = process.argv[3]
const number = process.argv[4]

if (name && number) {
  const person = new Person({
    name: name,
    number: number
  })
  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  mongoose.connection.close()
}

















// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })

// const note = new Note({
//   content: 'Superman',
//   date: new Date(),
//   important: true,
// })

// note.save().then(result => {
//   console.log(result)
//   mongoose.connection.close()
// })