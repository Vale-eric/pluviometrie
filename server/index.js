import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { pool } from './db.js'
dotenv.config()

const app = express()
// midellware
app.use(cors())
app.use(express.json())

//ROUTES

// create pluvioday
app.post('/pluviodays', async (req, res) => {
  try {
    const { quantity, postingDate } = req.body
    const newPluvioDay = await pool.query('INSERT INTO pluvioday (quantity, posting_date) VALUES ($1, $2) RETURNING *',
    [quantity, postingDate]
    )
    res.json(newPluvioDay.rows[0])
  } catch (error) {
    console.error(error.message)
  }
})

// get all pluvioday
app.get('/pluviodays', async (req, res) => {
  try {
    const allPluvio = await pool.query('SELECT * FROM pluvioday')
    res.json(allPluvio.rows)
  } catch (error) {
    console.error(error.message)
    
  }
})

// get a pluvioday
app.get('/pluviodays/:id', async (req, res) => {
  try {
    const { id } = req.params
    const pluvioday = await pool.query('SELECT * FROM pluvioday WHERE pluvio_id = $1', [id])

    res.json(pluvioday.rows[0])
  } catch (error) {
    console.error(error.message)
  }
})

// update pluvioday
app.put('/pluviodays/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { quantity } = req.body
    const updatePluvio = await pool.query('UPDATE pluvioday SET quantity = $1 WHERE pluvio_id = $2',
    [quantity, id])

    res.json('Pluvio updated')
  } catch (error) {
    console.error(error.message)
  }
})

// delete pluvioday
app.delete('/pluviodays/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deletePluvioDay = await pool.query('DELETE FROM pluvioday WHERE pluvio_id = $1',
    [id])
    res.json('Pluvioday was deleted')
  } catch (error) {
    console.error(error.message)
  }
}) 

const port = process.env.PORT
app.listen(port, ()=>{
  console.log('server as started on port ', port)
})