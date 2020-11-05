import { NoteInterface } from './components/forethoughtNote/ForethoughtNote';

const URL = ' https://forested-crystalline-bonobo.glitch.me/';

const getNotes = async (): Promise<Array<NoteInterface>> => {
	try {
		const res = await fetch(URL, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
			},
		});
		return res.json();
	} catch (err) {
		console.log('Error:', err);
		return [];
	}
};

const addNote = async (): Promise<NoteInterface | null> => {
	const note = {
		title: 'This is a new note',
		content: 'This is a beautiful new note',
		date_created: new Date(),
	};
	try {
		const res = await fetch(URL, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(note),
		});
		return res.json();
	} catch (err) {
		console.log('Error:', err);
		return null;
	}
};

const deleteNote = async (id: string) => {
	try {
		const res = await fetch(URL + id, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json',
			},
		});
	} catch (err) {
		console.log('Error:', err);
	}
};

const updateNote = async (note: NoteInterface) => {
	try {
		const res = await fetch(URL + note.id, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(note),
		});
	} catch (err) {
		console.log('Error:', err);
		return null;
	}
};

export { getNotes, addNote, deleteNote, updateNote };
