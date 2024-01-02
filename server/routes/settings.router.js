const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const id = req.user.id

  // selects latest session settings
  const queryValues = [id]
  const queryText = `
    SELECT "session_settings".id, "intervals_selected", "playback_type"
      FROM "session_settings"
      JOIN "session"
        ON "session".id = "session_settings".session_id
      WHERE "user_id" = $1
      ORDER BY "session_settings".id DESC
      LIMIT 1;
  `
  pool.query(queryText, queryValues)
    .then(result => {
      res.send(result.rows[0])
    })
    .catch(err => {
      console.error('Settings GET failed:', err)
    })
});

router.post('/', (req, res) => {
  const intervals = req.body.intervals.toString()
  const playback = req.body.playback
  const id = req.user.id
  // creates new session
  const sessionQueryValues = [id]
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
