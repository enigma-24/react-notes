import axios from 'axios';

const baseUrl = 'http://localhost:3001/notes';

const getAll = () => axios.get(baseUrl);

const create = (newNote) => axios.post(baseUrl, newNote);

const update = (id, newNote) => axios.put(`${baseUrl}/${id}`, newNote);

export default { getAll, create, update };
