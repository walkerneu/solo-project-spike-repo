import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function UserPage() {
  
  const [eventName, setEventName] = useState('');
  const [imgUpload, setImgUpload] = useState('');
  const [selectedGenre, setSelectedGenre] = useState([]);
  const eventForm = new FormData ();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "SAGA/GET_GENRES"
    })
  }, [])
  const genres = useSelector(store => store.genres)

  const addEvent = (event) => {
    event.preventDefault();
    eventForm.append("image", imgUpload);
    eventForm.append("eventName", eventName);
    eventForm.append("genre_id", selectedGenre)
    console.log("Event Form is:", eventForm);
    dispatch({
      type: 'SAGA/ADD_EVENT',
      payload: eventForm
    });
  };
  console.log("Selected genres:", selectedGenre);

  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Lets try to add an event!</p>
      <form className="formPanel" onSubmit={addEvent}>
      <div>
        <label>
          Event Name:
          <input
            type="text"
            name="eventname"
            value={eventName}
            required
            onChange={(event) => setEventName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Event Image:
          <input
            type="file"
            name="event-image"
            required
            onChange={(event) => setImgUpload(event.target.files[0])}
          />
        </label>
        <p>
        <label>
          Genre:
        <select multiple onChange={(event) => setSelectedGenre(event.target.value)}>
          {genres.map((genre) => (
            <option value={genre.id}>{genre.genre_name}</option>
          ))}
        </select>
        </label>
        </p>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Add Event" />
      </div>
    </form>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
