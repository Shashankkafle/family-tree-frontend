import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditPersonForm = () => {
	const { id } = useParams();
	const navigate = useNavigate(); // Initialize the navigate function
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
		parentId: '',
	});

	// Fetch the person details from the server
	useEffect(() => {
		const fetchPersonDetails = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/person/${id}`
				);
				setFormData(response.data);
			} catch (error) {
				toast.error('Error fetching person details');
			}
		};

		fetchPersonDetails();
	}, [id]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e) => {
		setFormData({ ...formData, image: e.target.files[0] });
	};

	// Function to update the person data
	const updatePerson = async (data) => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_API_URL}/person/${id}`,
				data,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			if (response.status === 200) {
				toast.success('Person updated successfully');
				navigate('/'); // Navigate to the home page on success
			} else {
				toast.error(`Error updating person: ${response.data?.error}`);
			}
		} catch (error) {
			toast.error(
				`Error updating person: ${
					error?.response?.data?.message || error.message
				}`
			);
		}
	};

	// Handle the form submission
	const handleSubmit = (e) => {
		e.preventDefault();

		const data = new FormData();
		data.append('firstName', formData.firstName);
		data.append('lastName', formData.lastName);
		data.append('birthDate', formData.birthDate);
		data.append('gender', formData.gender);
		data.append('profession', formData.profession);
		data.append('email', formData.email);
		data.append('permanentAdress', formData.permanentAdress);
		data.append('currentAdress', formData.currentAdress);
		data.append('parentId', formData.parentId);

		if (formData.deathDate) {
			data.append('deathDate', formData.deathDate);
		}

		if (formData.image) {
			data.append('image', formData.image);
		}

		// Call the updatePerson function to send the data
		updatePerson(data);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-6 rounded-lg shadow-lg"
		>
			<h2 className="text-2xl font-bold mb-4">Update Person</h2>

			{/* First Name Input */}
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

			{/* Last Name Input */}
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

			{/* Birth Date Input */}
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

			{/* Gender Select */}
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

			{/* Profession Input */}
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

			{/* Email Input */}
			<div className="mb-4">
				<label className="block text-gray-700">Email</label>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>

			{/* Permanent Address Input */}
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

			{/* Current Address Input */}
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

			{/* Date of Death Input */}
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

			{/* Parent ID Input */}
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

			{/* Image File Input */}
			<div className="mb-4">
				<label className="block text-gray-700">Image</label>
				<input
					type="file"
					name="image"
					onChange={handleFileChange}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>

			{/* Submit Button */}
			<button
				type="submit"
				className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
			>
				Update Person
			</button>
		</form>
	);
};

export default EditPersonForm;
