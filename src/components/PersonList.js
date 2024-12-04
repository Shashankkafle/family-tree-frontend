import React, { useEffect, useState } from 'react';
import PersonCard from './PersonCard';
import axios from 'axios';
import Loading from './Loading';
import { toast } from 'react-toastify';

const PersonList = () => {
	const [people, setPeople] = useState([]);
	const [loading, setLoading] = useState(true);

	async function fetchAllPerson() {
		try {
			const list = await axios.get(
				process.env.REACT_APP_API_URL + '/person',
				{ timeout: 50000 }
			);
			setPeople(list.data);
		} catch (e) {
			toast.error(e.message);
		} finally {
			setLoading(false); // Stop loading after data is fetched
		}
	}

	useEffect(() => {
		fetchAllPerson();
	}, []);

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
			{people.map((person) => (
				<PersonCard key={person.id} person={person} />
			))}
		</div>
	);
};

export default PersonList;
