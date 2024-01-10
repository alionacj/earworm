const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// retrieves user's total session data and interval data
router.get('/', (req, res) => {

  const id = req.user.id

  let sessionHistory
  let intervalData

  const sessionQuery = `
    SELECT "session_number", "session_date", "playback_type", "sound_type", "comments"
      FROM "session"
      JOIN "session_settings"
        ON "session_settings".session_id = "session".id
      WHERE user_id = $1
      ORDER BY "session_number" DESC
    ;
  `
  const sessionValues = [id]

  pool.query(sessionQuery, sessionValues)
  .then(result => {

    sessionHistory = result.rows

    const intervalQuery = `
      SELECT "session_number", "interval_type",
              COUNT(CASE WHEN "is_correct" = true THEN 1 END) AS "correct_count",
              COUNT(CASE WHEN "is_correct" != true THEN 1 END) AS "incorrect_count"
        FROM "session"
        JOIN "session_intervals"
          ON "session_intervals".session_id = "session".id
        WHERE "user_id" = $1
        GROUP BY "session_number", "interval_type"
        ORDER BY "session_number" DESC
      ;
    `
    const intervalValues = [id]

    pool.query(intervalQuery, intervalValues)
    .then(result => {
      
      intervalData = result.rows

      for (let session of sessionHistory) {
        session.intervals = []
        for (let interval of intervalData) {
          if (session.session_number === interval.session_number) {
            session.intervals.push({
              interval: interval.interval_type,
              correct: interval.correct_count,
              incorrect: interval.incorrect_count
            })
          }
        }
      }

      res.send(sessionHistory)
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
