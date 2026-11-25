const express = require('express')
const { Pool } = require('pg')


const app = express();
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});


app.get('/', async (req,res) => {
  try {
     const result = await pool.query('SELECT NOW()');
     res.json({ status: 'OK', db_time: result.rows[0].now });
   } catch (err) {
     res.status(500).json({ status: 'ERROR', message: err.message });
   }
});

app.listen(3000, () => console.log('Server jalan di port 3000'));
