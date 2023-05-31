import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/authSlice';

const HomePage = () => {
    const [notes, setNotes] = useState([]);
    const dispatch = useDispatch();
    const authTokens = useSelector((state) => state.auth.authTokens);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/notes/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens?.access),
            },
        });
        let data = await response.json();

        if (response.status === 200) {
            setNotes(data);
        } else if (response.statusText === 'Unauthorized') {
            dispatch(logoutUser());
        }
    };

    return (
        <div>
            <p>You are logged in to the home page!</p>

            <ul>
                {notes.map((note) => (
                    <li key={note.id}>{note.body}</li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
