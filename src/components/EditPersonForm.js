import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CreateChildForm = () => {
	const { id } = useParams();
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		birthDate: '',
		gender: '',
		profession: '',
		email: '',
		permanentAdress: '',
		currentAdress: '',
		deathDate: '',
		image: null, 
	});

	const handleFileChange = (e) => {
		setFormData({ ...formData, image: e.target.files[0] });
	};

	async function fetchPersonDetails() {
		const person = await axios.get(
			process.env.REACT_APP_API_URL + '/person/' + id
		);
		setFormData(person.data);
	}

	useEffect(() => {
		fetchPersonDetails();
	}, []);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = new FormData(); // Create FormData object
		data.append('firstName', formData.firstName);
		data.append('lastName', formData.lastName);
		data.append('birthDate', formData.birthDate);
		data.append('gender', formData.gender);
		data.append('profession', formData.profession);
		data.append('email', formData.email);
		data.append('permanentAdress', formData.permanentAdress);
		data.append('currentAdress', formData.currentAdress);

		if (formData.deathDate) {
			data.append('deathDate', formData.deathDate);
		}

		data.append('parentId', formData.parentId);

		if (formData.image) {
			data.append('image', formData.image);
		}

		axios
			.put(process.env.REACT_APP_API_URL + '/person/' + id, data, {
				headers: {
					'Content-Type': 'multipart/form-data', // Set the content type
				},
			})
			.then((response) => {
				console.log('Person updated:', response.data);
			})
			.catch((error) => console.error('Error updating person:', error));
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-6 rounded-lg shadow-lg"
		>
			<h2 className="text-2xl font-bold mb-4">Update Person</h2>
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
				<label className="block text-gray-700">Profession</label>
				<input
					type="text"
					name="profession"
					value={formData.profession}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700">Email</label>
				<input
					type="text"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700">Permanent Address</label>
				<input
					type="text"
					name="permanentAdress"
					value={formData.permanentAdress}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700">Current Address</label>
				<input
					type="text"
					name="currentAdress"
					value={formData.currentAdress}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700">
					Date of Death (if applicable)
				</label>
				<input
					type="date"
					name="deathDate"
					value={formData.deathDate}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded"
				/>
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
			<div className="mb-4">
				<label className="block text-gray-700">Image:</label>
				<input
					type="file"
					name="image"
					onChange={handleFileChange}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>
			<button
				type="submit"
				className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
			>
				Update Child
			</button>
		</form>
	);
};

export default CreateChildForm;
