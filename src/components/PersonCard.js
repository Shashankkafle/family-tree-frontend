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
		await axios.delete(
			process.env.REACT_APP_API_URL + '/person/' + person.id
		);
		setIsOpen(false);
	};

	return (
		<div className="bg-white p-6 shadow-lg rounded-lg">
			<Modal
				isOpen={modalIsOpen}
				contentLabel="Example Modal"
				overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
				className="bg-white rounded-lg p-4"
			>
				<div className="bg-white p-4 rounded-lg">
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
						className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 m-1 rounded"
					>
						Cancel
					</button>
				</div>
			</Modal>
			<div className="relative flex space-x-2">
				<button
					className="focus:outline-none"
					onClick={handleEditPerson}
				>
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="text-gray-600"
					/>
				</button>
				<button
					className="focus:outline-none"
					onClick={() => setIsOpen(true)}
				>
					<FontAwesomeIcon icon={faTrash} className="text-gray-600" />
				</button>
			</div>
			<h2 className="text-xl font-bold mt-2">
				{person.firstName} {person.lastName}
			</h2>
			<p className="text-gray-600">
				Born: {new Date(person.birthDate).toLocaleDateString()}
			</p>
			<p className="text-gray-600">Gender: {person.gender}</p>
			{person.partnerFirstName && (
				<p className="text-gray-600">
					Partner: {person.partnerFirstName} {person.partnerLastName}
				</p>
			)}
			{person.profession && (
				<p className="text-gray-600">Profession: {person.profession}</p>
			)}
			{person.email && (
				<p className="text-gray-600">Email: {person.email}</p>
			)}
			{person.permanentAddress && (
				<p className="text-gray-600">
					Permanent Address: {person.permanentAddress}
				</p>
			)}
			{person.currentAddress && (
				<p className="text-gray-600">
					Current Address: {person.currentAddress}
				</p>
			)}
			{person.deathDate && (
				<p className="text-gray-600">
					Date of Death:{' '}
					{new Date(person.deathDate).toLocaleDateString()}
				</p>
			)}
			{person.image && (
				<div className="mt-4">
					<img
						src={person.image}
						alt={`${person.firstName} ${person.lastName}`}
						className="rounded-lg h-24 w-24 object-cover"
					/>
				</div>
			)}
			<div className="mt-4">
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
		</div>
	);
};

export default PersonCard;
