import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PersonListDropdown from './PersonListDropdown';
const TextField = ({ label, name, value, onChange }) => {
	return (
		<div className="mb-4" onFocus={() => console.log("Focused input", name)}>
			<label className="block text-gray-700">{label}</label>
			<input
				type="text"
				name={name}
				value={value}
				onChange={onChange}
				className="w-full p-2 border border-gray-300 rounded"
			/>
		</div>
	)
}
const CreateChildForm = () => {
	const { parent } = useParams();
	const [parents,setParents] = useState([]);

	useEffect(() => {
		async function fetchParents() {
			console.log('Fetching parents for:', parent);
			const parentList = await axios.get(`${process.env.REACT_APP_API_URL}/person/partner/${parent}`);
			console.log('Parent List:', parentList.data);
			setParents(parentList.data);
		}
		fetchParents();
	}, [parent]);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		birthDate: '',
		gender: '',
		parent1Id: parent,
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('formdata', formData);
	
		axios.post(`${process.env.REACT_APP_API_URL}/person/child`, formData)
			.then((response) => {
				console.log('Person created:', response.data);
			})
			.catch((error) => {
				console.error('Error creating person:', error);
			});
	};


	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-6 rounded-lg shadow-lg"
		>
			<h2 className="text-2xl font-bold mb-4">Add New Person</h2>
			<TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
			<TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
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
			<PersonListDropdown people={parents} onSelect={(selectedId) =>
		setFormData({ ...formData, parent2Id: selectedId })
	} />
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
