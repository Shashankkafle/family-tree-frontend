import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

const PersonCard = ({ person }) => {
	const navigate = useNavigate();
	const handleAddChild = () => {
		navigate('/create-child/' + person.id);
	};
	const handleAddPartner = () => {
		navigate('/create-partner/' + person.id);
	};
	const handleEditPerson = () => {
		navigate('/edit-person/' + person.id);
	};

	return (
		<div className="bg-white p-4 shadow-lg rounded-lg">
			<div className="realtive flex space-x-2">
				<button className="focus:outline-none">
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="text-gray-600"
						onClick={handleEditPerson}
					/>
				</button>
				<button className="focus:outline-none">
					<FontAwesomeIcon icon={faTrash} className="text-gray-600" />
				</button>
			</div>
			<h2 className="text-xl font-bold">
				{person.firstName} {person.lastName}
			</h2>
			<p className="text-gray-600">
				Born: {new Date(person.birthDate).toLocaleDateString()}
			</p>
			<p className="text-gray-600">Gender: {person.gender}</p>
			{person.partnerFirstName && (
				<p className="text-gray-600">
					Partner: {person.partnerFirstName} {person.partnerFirstName}
				</p>
			)}
			<button
				onClick={handleAddChild}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Add Child
			</button>
			<button
				onClick={handleAddPartner}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Add Partner
			</button>
		</div>
	);
};

export default PersonCard;
