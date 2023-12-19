const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();
const cloudinaryUpload = require("../modules/cloudinary.config");

router.post("/", cloudinaryUpload.single("image"), async (req, res) => {
  const eventName = req.body.eventName;
  const imageUrl = req.file.path;
  const userId = req.user.id;
  const genreIdArray = req.body.genre_id;

  const eventQuery = `
    INSERT INTO "events" 
      ("event_name", "event_photo_url", "creator_id")
      VALUES
      ($1, $2, $3)
      RETURNING "id";
  `;
  const eventValues = [eventName, imageUrl, userId];

  pool
    .query(eventQuery, eventValues)
    .then((result) => {
      console.log("New Event Id:", result.rows[0].id);
      const createdEventId = result.rows[0].id;
      for (let genreId of genreIdArray) {
      const eventGenreQuery = `
        INSERT INTO "events_genres" 
          ("event_id", "genre_id")
          VALUES
          ($1, $2);
      `;
      const eventGenreValues = [createdEventId, genreId];

      pool
        .query(eventGenreQuery, eventGenreValues)
        .then((result) => {
          
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    }
    res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
