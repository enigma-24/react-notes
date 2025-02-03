import { useState, useEffect } from 'react';
import Note from './components/Note';
import axios from 'axios';

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('');
	const [showAll, setShowAll] = useState(true);

	useEffect(() => {
		axios
			.get('http://localhost:3001/notes')
			.then((response) => setNotes(response.data));
	}, []);

	const addNote = (event) => {
		event.preventDefault();
		const newNoteObject = {
			content: newNote,
			important: Math.random() < 0.5,
		};

		axios
			.post('http://localhost:3001/notes', newNoteObject)
			.then((response) => {
				setNotes([...notes, response.data]);
				setNewNote('');
			})
			.catch((error) => console.error(error));
	};

	const handleNoteChange = (event) => setNewNote(event.target.value);

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	return (
		<div>
			<h1>Notes</h1>
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
			<ul>
				{notesToShow.map((note) => (
					<Note key={note.id} note={note} />
				))}
			</ul>
			<form onSubmit={addNote}>
				<input type='text' value={newNote} onChange={handleNoteChange} />
				<button type='submit'>save</button>
			</form>
		</div>
	);
};

export default App;
