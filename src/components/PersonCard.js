import React from 'react';

const PersonCard = ({ person }) => {
	return (
		<div className="bg-white p-4 shadow-lg rounded-lg">
			<h2 className="text-xl font-bold">
				{person.firstName} {person.lastName}
			</h2>
			<p className="text-gray-600">
				Born: {new Date(person.birthDate).toLocaleDateString()}
			</p>
			<p className="text-gray-600">Gender: {person.gender}</p>
			{person.Father && (
				<p className="text-gray-600">
					Father: {person.Father.firstName} {person.Father.lastName}
				</p>
			)}
			{person.Mother && (
				<p className="text-gray-600">
					Mother: {person.Mother.firstName} {person.Mother.lastName}
				</p>
			)}
		</div>
	);
};

export default PersonCard;
