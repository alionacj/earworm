const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// there is no GET route because the history router
  // contains interval data

// adds an interval and its session id
// is_correct defaults to false - if the user
  // navigates away they get the question wrong
router.post('/', (req, res) => {
  const interval = req.body.interval
  const sessionId = req.body.sessionId
  const query = `
    INSERT INTO "session_intervals" ("interval_type", "session_id")
      VALUES ($1, $2)
      RETURNING "id"
  `
  const values = [interval, sessionId]
  pool.query(query, values)
    .then(result => {
        // sends back interval id which
          // will be stored in the prompt
        res.send({id: result.rows[0].id})
    })
    .catch(error => {
        console.error('Intervals POST route failed:', error)
        res.sendStatus(500)
    })
});

// upon answer, is_correct is marked true
  // or remains false. subsequent answers
  // have no effect
router.put('/', (req, res) => {
  // only updates on first answer attempt
  const query = `
    UPDATE "session_intervals"
      SET "is_correct" = true
      WHERE "id" = $1
  `
  const values = [req.body.intervalId]
  pool.query(query, values)
    .then(result => {
      res.sendStatus(201)
    })
    .catch(error => {
      console.error('Interval PUT route failed:', error)
      res.sendStatus(500)
    })
})

module.exports = router;
