import React, {useEffect, useState} from 'react';
// import { databases } from '../appwrite/config';
import db from '../appwrite/databases';
import NoteForm from '../components/NoteForm';
import { Query } from 'appwrite';
import Note from '../components/Note';

function Notes() {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        // const response = await databases.listDocuments(
        //     import.meta.env.VITE_DATABASE_ID,
        //     import.meta.env.VITE_COLLECTION_ID_NOTES
        // );

        const response = await db.notes.list(
            [Query.orderDesc('$createdAt')]
        )
        setNotes(response.documents);
    };

  return (
    <>
    <div>
        <h1>Todo List</h1>
    </div>
         <NoteForm setNotes={setNotes} />
      
        <div>
            {notes.map((note) => (
                <Note key={note.$id} setNotes={setNotes} noteData={note} />
                // <div key={note.$id}>{note.body}</div>
            ))}
        </div>
    </>
  )
}

export default Notes
