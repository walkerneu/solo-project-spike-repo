import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function UserPage() {
  
  const [eventName, setEventName] = useState('');
  const [fileUpload, setFileUpload] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
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
    eventForm.append("file", fileUpload);
    eventForm.append("eventName", eventName);
    eventForm.append("genre_id", selectedGenre);
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
      <audio controls src="https://res.cloudinary.com/dcram3k0q1/video/upload/v1705711050/syquoqbokasssbuem1sf.wav"></audio>
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
            name="event-file"
            onChange={(event) => setFileUpload(event.target.files[0])}
          />
        </label>
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
