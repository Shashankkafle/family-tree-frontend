import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CreateChildForm = () => {
  const { parent } = useParams();
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
		parentId: parent,
  });

  const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
		setFormData({ ...formData, image: e.target.files[0] });
  };

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
		console.log(formData.deathDate);
		if (formData.deathDate) {
			data.append('deathDate', formData.deathDate);
		}
		if (formData.image) {
			data.append('image', formData.image);
		}

		fetch(process.env.REACT_APP_API_URL + '/person/child', {
			method: 'POST',
			body: data,
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
				<label className="block text-gray-700">Permanent Adress</label>
				<input
					type="text"
					name="permanentAdress"
					value={formData.permanentAdress}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded"
				/>
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">Current Adress</label>
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
				<label className="block text-gray-700">Image</label>
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
				Create Child
			</button>
		</form>
  );
};

export default CreateChildForm;
