import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CreatePartnerForm = () => {
	const { partner } = useParams();
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		birthDate: '',
		gender: '',
		profession: '',
		email: '',
		permanentAddress: '',
		currentAddress: '',
		deathDate: '',
		partnerId: partner,
		image: null, // For file uploads
	});

	const handleFileChange = (e) => {
		setFormData({ ...formData, image: e.target.files[0] });
	};

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
		data.append('permanentAddress', formData.permanentAddress);
		data.append('currentAddress', formData.currentAddress);
		data.append('partnerId', formData.partnerId);

		// Check if deathDate is empty, if so, append null
		if (formData.deathDate) {
			data.append('deathDate', formData.deathDate);
		}

		// Check if an image is selected before appending
		if (formData.image) {
			data.append('image', formData.image);
		}

		fetch(process.env.REACT_APP_API_URL + '/person/partner', {
			method: 'POST',
			body: data, // Send FormData directly
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
					type="email"
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
					name="permanentAddress"
					value={formData.permanentAddress}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700">Current Address</label>
				<input
					type="text"
					name="currentAddress"
					value={formData.currentAddress}
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
				<label className="block text-gray-700">Partner ID</label>
				<input
					type="number"
					name="partnerId"
					value={formData.partnerId}
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
				Create Partner
			</button>
		</form>
	);
};

export default CreatePartnerForm;
