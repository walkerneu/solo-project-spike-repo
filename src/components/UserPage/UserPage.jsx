import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function UserPage() {
  
  const [eventName, setEventName] = useState('');
  const [imgUpload, setImgUpload] = useState('');
  const eventForm = new FormData ();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "SAGA/GET_GENRES"
    })
  }, [])
  const genres = useSelector(store => store.genres)
  console.log("Genres:", genres);

  const addEvent = (event) => {
    event.preventDefault();
    eventForm.append("eventName", eventName);
    eventForm.append("img", imgUpload);
    dispatch({
      type: '',
      payload: eventForm
    });
  };

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
        <label htmlFor="password">
          Password:
          <input
            type="file"
            name="password"
            value={imgUpload}
            required
            onChange={(event) => setImgUpload(event.target.files[0])}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
