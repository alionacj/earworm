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
      RETURNING "id"
  `
  const values = [interval, sessionId]
  pool.query(query, values)
    .then(result => {
        res.send({id: result.rows[0].id})
    })
    .catch(error => {
        console.error('Intervals POST route failed:', error)
        res.sendStatus(500)
    })
});

router.put('/', (req, res) => {
  // only updates on first attempt
  const query = `
    UPDATE "session_intervals"
      SET "is_correct" = $1
      WHERE "id" = $2
        AND "is_correct" IS NULL;
  `
  const values = [req.body.is_correct, req.body.id]
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
