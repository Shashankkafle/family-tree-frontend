import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TextField from './input/TextField';
import { toast } from 'react-toastify';

const CreatePartnerForm = () => {
	const { partner } = useParams();
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		profession: '',
		permanentAddress: '',
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
		fetch(process.env.REACT_APP_API_URL + '/person/partner', {
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
			<h2 className="text-2xl font-bold mb-4">Add New Partner</h2>
			<TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
				<TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
				<TextField label="Permanent Address" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} />
				<TextField label="Current Address" name="currentAddress" value={formData.currentAddress} onChange={handleChange} />
				<TextField label="Email" name="email" value={formData.email} onChange={handleChange} />
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
