import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import PersonListDropdown from './PersonListDropdown';
import TextField from './input/TextField';
import { useFetchAllPartners } from '../hooks/apiCalls';
import Loading from './Loading';
import { toast } from 'react-toastify';
import { validatePersonvalues } from '../utils/validator';

const CreateChildForm = () => {
	const { parentId } = useParams();
	const { partners, isPartnerLoading, partnerError } = useFetchAllPartners(parentId);
		const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		profession: '',
		permanentAddress: '',
		birthDate: '',
		gender: '',
		currentAddress: '',
		image: '',
		parent1Id: parentId,
	});

	const firstNameRef = useRef(null);
	const lastNameRef = useRef(null);
	const emailRef = useRef(null);
	const deathDateRef = useRef(null);
	const birthDateRef = useRef(null);
	const genderRef = useRef(null);
	const parent2IdRef = useRef(null);

	const toFormFormat = (data) => {
		const formData = new FormData();
		for (const key in data) {
			if (key === 'image' && data[key]?.length) {
				formData.append('image', data[key][0]); // First file
			} else if (data[key] !== null && data[key] !== undefined) {
				formData.append(key, data[key]);
			}
		}
		return formData;
	};
	
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e) => {
		setFormData({ ...formData, image: e.target.files });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if(!formData.parent2Id){
			toast.error('Please select a parent for the child');
			parent2IdRef.current.focus();
			return;
		}
		const validationResult = validatePersonvalues(formData);
		if(validationResult){
			switch (validationResult){
				case 'firstName':
					firstNameRef.current.focus();
					break;
				case 'lastName':
					lastNameRef.current.focus();
					break;
				case 'birthDate':
					birthDateRef.current.focus();
					break;
				case 'email':
					emailRef.current.focus();
					break;
				case 'gender':
					genderRef.current.focus();
					break
				case 'deathDate':
					deathDateRef.current.focus();
					break;
				
				
			}

			return
		}
		const data = toFormFormat(formData);
		axios.post(`${process.env.REACT_APP_API_URL}/person/child`, data)
			.then((response) => {
				toast.success('Child created successfully!');
			})
			.catch((error) => {
				console.log("error",error)
				toast.error(`Error creating person:${error?.response?.data?.message||error.message}`);
			});
	};
	if (isPartnerLoading) {
		return <Loading />;
	}
	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-6 rounded-lg shadow-lg"
		>
			<h2 className="text-2xl font-bold mb-4">Add New Child</h2>
				<TextField fieldRef={firstNameRef} label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
				<TextField fieldRef={lastNameRef} label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
				<TextField label="Permanent Address" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} />
				<TextField label="Current Address" name="currentAddress" value={formData.currentAddress} onChange={handleChange} />
				<TextField fieldRef={emailRef} label="Email" name="email" value={formData.email} onChange={handleChange} />
				<div className="mb-4">
					<label className="block text-gray-700">Birth Date</label>
					<input
						ref={birthDateRef}
						type="date"
						name="birthDate"
						value={formData.birthDate}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Death Date</label>
					<input
					ref={deathDateRef}
						type="date"
						name="deathDate"
						value={formData.deathDate}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Gender</label>
					<select
						ref={genderRef}
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
				<label className="block text-gray-700">Image</label>
				<input
					type="file"
					name="image"
					onChange={handleFileChange}
					className="w-full p-2 border border-gray-300 rounded"
				/>
				</div>
				<div className="mb-4">
					{isPartnerLoading ? (
						<Loading />
						) : (
						<PersonListDropdown
							people={partners}
							onSelect={(selectedId) =>
							setFormData({ ...formData, parent2Id: selectedId })
							}
							fieldRef={parent2IdRef}
						/>
					)}
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
