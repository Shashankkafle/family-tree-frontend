import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import axios from 'axios';
Modal.setAppElement(document.getElementById('modal'));

const PersonCard = ({ person }) => {
	const [modalIsOpen, setIsOpen] = useState(false);
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
	const handleDeletePerson = async () => {
		console.log('deleting', person);
		await axios.delete(
			process.env.REACT_APP_API_URL + '/person/' + person.id
		);
		setIsOpen(false);
	};

	return (
		<div className="bg-white p-4 shadow-lg rounded-lg">
			<Modal
				isOpen={modalIsOpen}
				contentLabel="Example Modal"
				overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
				className="bg-white rounded-lg p-4"
			>
				<div className="bg-white p-4  rounded-lg">
					<p className="text-gray-600">
						Are you sure you want to delete?
					</p>

					<button
						onClick={handleDeletePerson}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded"
					>
						Delete
					</button>
					<button
						onClick={() => {
							setIsOpen(false);
						}}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded"
					>
						Cancel
					</button>
				</div>
			</Modal>
			<div className="realtive flex space-x-2">
				<button className="focus:outline-none">
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="text-gray-600"
						onClick={handleEditPerson}
					/>
				</button>
				<button className="focus:outline-none">
					<FontAwesomeIcon
						icon={faTrash}
						className="text-gray-600"
						onClick={() => {
							console.log('clicked');
							setIsOpen(true);
						}}
					/>
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
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded"
			>
				Add Child
			</button>
			<button
				onClick={handleAddPartner}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded"
			>
				Add Partner
			</button>
		</div>
	);
};

export default PersonCard;
