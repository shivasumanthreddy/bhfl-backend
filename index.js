const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json()) // To parse JSON requests

app.post('/bfhl', (req, res) => {
  const { data } = req.body

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: 'Invalid request: "data" should be an array.',
    })
  }

  // Separate numbers and alphabets
  const numbers = data.filter((item) => !isNaN(item))
  const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item))
  const lowercaseAlphabets = alphabets.filter((char) => /^[a-z]$/.test(char))

  // Find the highest lowercase alphabet
  const highestLowercaseAlphabet =
    lowercaseAlphabets.length > 0
      ? [lowercaseAlphabets.sort().reverse()[0]]
      : []

  res.json({
    is_success: true,
    user_id: 'john_doe_17091999',
    email: 'john@xyz.com',
    roll_number: 'ABCD123',
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
    file_valid: true, // Assuming file handling is done separately
    file_mime_type: 'image/png',
    file_size_kb: '400',
  })
})

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 })
})

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
