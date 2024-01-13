const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// selects latest session settings
router.get('/', (req, res) => {
  const id = req.user.id
  const queryValues = [id]
  const queryText = `
    SELECT "session".id AS "session_id", "intervals_selected", "playback_type"
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

// creates new session entry and settings entry
router.post('/', (req, res) => {

  const intervals = req.body.intervals.toString()
  const playback = req.body.playback
  const id = req.user.id

  // adds session row
    // session number set to increment
    // if there are no previous session, session_number set to 1
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
  const sessionQueryValues = [id]
  pool.query(sessionQueryText, sessionQueryValues)

  .then(result => {

    // adds session_settings row
    const sessionId = result.rows[0].id
    const settingsQueryText = `
      INSERT INTO "session_settings" ("intervals_selected", "playback_type", "session_id")
      VALUES ($1, $2, $3)
    `
    const settingsQueryValues = [intervals, playback, sessionId]
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
