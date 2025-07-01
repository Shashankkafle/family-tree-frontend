import React, { useEffect } from 'react';
import PersonCard from './PersonCard';
import Loading from './Loading';
import { toast } from 'react-toastify';
import { useFetchAllPerson } from '../hooks/apiCalls';

const PersonList = () => {
	const { people, isPeopleLoading, peopleError } = useFetchAllPerson();
	if (isPeopleLoading) {
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
