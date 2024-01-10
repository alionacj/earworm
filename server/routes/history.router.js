const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// retrieves user's total session data and interval data
router.get('/', (req, res) => {

  const id = req.user.id

  let sessionData
  let intervalData

  const sessionQuery = `
    SELECT "session".session_number, "session".session_date, "session_settings".playback_type, "session_settings".sound_type, "session".comments
      FROM "session"
      JOIN "session_settings"
        ON "session_settings".session_id = "session".id
      WHERE "session".user_id = $1
      ORDER BY "session".session_number DESC
    ;
  `
  const sessionValues = [id]

  pool.query(sessionQuery, sessionValues)
  .then(result => {

    sessionData = result.rows

    const intervalQuery = `
      SELECT "session".session_number, "session_intervals".interval_type, "session_intervals".is_correct, COUNT("session_intervals".interval_type)
      FROM "session_intervals"
      JOIN "session"
        ON "session".id = "session_intervals".session_id
      JOIN "user"
        ON "session".user_id = "user".id
      WHERE "user_id" = $1
      GROUP BY "session_intervals".interval_type, "session_intervals".is_correct, "session".session_number
      ORDER BY "session".session_number DESC, "session_intervals".interval_type
      ;
    `
    const intervalValues = [id]

    pool.query(intervalQuery, intervalValues)
    .then(result => {
      intervalData = result.rows
      res.send({ sessionData, intervalData })
    })
    .catch(error => {
      console.error('Interval History GET failed:', error)
    })

  })
  .catch(error => {
    console.error('Session History GET failed:', error)
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
