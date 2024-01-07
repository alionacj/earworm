const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

router.post('/', (req, res) => {
  const interval = req.body.interval
  const sessionId = req.body.sessionId
  const query = `
    INSERT INTO "session_intervals" ("interval_type", "session_id")
      VALUES ($1, $2)
  `
  const values = [interval, sessionId]
  pool.query(query, values)
    .then(result => {
        res.sendStatus(201)
    })
    .catch(error => {
        console.error('Intervals POST route failed:', error)
        res.sendStatus(500)
    })
});

module.exports = router;
