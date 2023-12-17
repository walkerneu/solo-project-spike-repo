const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const cloudinaryUpload = require('../modules/cloudinary.config');

router.post('/', cloudinaryUpload.single("image"), async (req, res) => {
    const eventName = req.body.eventName;
    const imageUrl = req.file.path;
    const userId = req.user.id;
    const genreId = req.body.genre_id
  
    const eventQuery = `
    INSERT INTO "events" 
      ("event_name", "event_photo_url", "creator_id")
      VALUES
      ($1, $2, $3)
      RETURNING "id";
  `;
  const eventValues = [
    eventName,
    imageUrl,
    userId,
  ];
  
  pool
    .query(eventQuery, eventValues)
    .then((result) => {
      // ID IS HERE!
      console.log("New Movie Id:", result.rows[0].id);
      const createdEventId = result.rows[0].id;
        // Now handle the genre reference:
        const eventGenreQuery = `
        INSERT INTO "events_genres" 
          ("movie_id", "genre_id")
          VALUES
          ($1, $2);
      `;
        const eventGenreValues = [createdEventId, genreId];
        // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
        pool
          .query(insertMovieGenreQuery, insertMovieGenreValues)
          .then((result) => {
            //Now that both are done, send back success!
            res.sendStatus(201);
          })
          .catch((err) => {
            // catch for second query
            console.log(err);
            res.sendStatus(500);
          });
    })
    .catch((err) => {
      // 👈 Catch for first query
      console.log(err);
      res.sendStatus(500);
    });
  });


module.exports = router;