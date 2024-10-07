import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CreatePersonForm = () => {
	const { parent } = useParams();
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		birthDate: '',
		gender: '',
		parentId: parent,
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('formdata', formData);
		fetch(process.env.REACT_APP_API_URL + '/person', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Person created:', data);
			})
			.catch((error) => console.error('Error creating person:', error));
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-6 rounded-lg shadow-lg"
		>
			<h2 className="text-2xl font-bold mb-4">Add New Person</h2>
			<div className="mb-4">
				<label className="block text-gray-700">First Name</label>
				<input
					type="text"
					name="firstName"
					value={formData.firstName}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700">Last Name</label>
				<input
					type="text"
					name="lastName"
					value={formData.lastName}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700">Birth Date</label>
				<input
					type="date"
					name="birthDate"
					value={formData.birthDate}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700">Gender</label>
				<select
					name="gender"
					value={formData.gender}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded"
				>
					<option value="">Select Gender</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
				</select>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700">Parent ID</label>
				<input
					type="number"
					name="parentId"
					value={formData.parentId}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded"
					disabled
				/>
			</div>
			<button
				type="submit"
				className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
			>
				Create Person
			</button>
		</form>
	);
};

export default CreatePersonForm;
