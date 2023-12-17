const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    const query = `
      SELECT * FROM "genres";
    `;
    pool.query(query)
      .then(result => {
        res.send(result.rows);
        console.log(result.rows);
      })
      .catch(err => {
        console.log('Error in genres router GET all:', err);
        res.sendStatus(500)
      })
  });


module.exports = router;