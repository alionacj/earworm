const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
});

router.post('/', (req, res) => {
  // data to be sent to db
  const intervals = req.body.intervals.toString()
  const playback = req.body.playback
  const id = req.user.id
  // creates new session
  const sessionQueryValues = [1]
  const sessionQueryText = `
    INSERT INTO "session" ("session_number", "user_id")
    VALUES (
      CASE
        WHEN ( SELECT COUNT(*) FROM "session" WHERE "user_id" = $1 ) != 0
        THEN ( SELECT MAX("session_number") FROM "session" WHERE "user_id" = $1 ) + 1
        ELSE 1
      END,
      $1 )
    RETURNING "id";
    `
  pool.query(sessionQueryText, sessionQueryValues)
      // creates session_settings entry
      .then(result => {
        const sessionId = result.rows[0].id
        const settingsQueryValues = [intervals, playback, sessionId]
        const settingsQueryText = `
          INSERT INTO "session_settings" ("intervals_selected", "playback_type", "session_id")
          VALUES ($1, $2, $3)
          `
        pool.query(settingsQueryText, settingsQueryValues)
          .then(result => {
            res.sendStatus(201)
          })
          .catch(err => {
            console.error('Settings POST failed:', err)
            res.sendStatus(500)
          })
      })
      .catch(err => {
        console.error('Session POST failed:', err)
        res.sendStatus(500)
      })
});

module.exports = router;
