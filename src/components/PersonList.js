import React, { useEffect, useState } from 'react';
import PersonCard from './PersonCard';
import axios from 'axios';
import Example from './Dendrogram';

const PersonList = () => {
	const [people, setPeople] = useState([]);
	async function fetchAllPerson() {
		const list = await axios.get(process.env.REACT_APP_API_URL + '/person');
		console.log('list', list.data);
		setPeople(list.data);
	}

	useEffect(() => {
		fetchAllPerson();
	}, []);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
			{people.map((person) => (
				<PersonCard key={person.id} person={person} />
			))}
		</div>
	);
};

export default PersonList;
