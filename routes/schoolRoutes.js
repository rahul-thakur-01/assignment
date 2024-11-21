const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/addSchool', async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || latitude == null || longitude == null) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const query = `
      INSERT INTO schools (name, address, latitude, longitude)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [name, address, latitude, longitude];
    const result = await pool.query(query, values);
    console.log(result);

    res.status(201).json({ school: result.rows[0] });
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


router.get('/listSchools', async (req, res) => {
  const { latitude, longitude } = req.query;

  if (latitude == null || longitude == null) {
    return res.status(400).json({ error: 'Latitude and longitude are required.' });
  }

  try {
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    const query = `
      SELECT id, name, address, latitude, longitude,
        ( 
          6371 * acos(
            cos(radians($1)) * cos(radians(latitude)) *
            cos(radians(longitude) - radians($2)) +
            sin(radians($1)) * sin(radians(latitude))
          )
        ) AS distance
      FROM schools
      ORDER BY distance ASC;
    `;
    const values = [userLat, userLon];
    const result = await pool.query(query, values);

    res.status(200).json({ schools: result.rows });
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;