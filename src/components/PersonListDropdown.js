import React, { useState } from 'react';

const PersonListDropdown = ({ people, onSelect }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedPerson, setSelectedPerson] = useState(null);

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	const handleSelect = (person) => {
		setSelectedPerson(person);
		onSelect(person.id);
		setIsOpen(false);
	};

	return (
		<div className="relative inline-block text-left">
			<button
				className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 flex items-center justify-between w-48"
				onClick={toggleDropdown}
			>
				<span>
					{selectedPerson
						? `${selectedPerson.firstName} (${selectedPerson.id})`
						: 'Select a Person'}
				</span>
				<span className="ml-2">&#9662;</span> {/* ▼ symbol */}
			</button>

			{isOpen && (
				<div className="absolute bg-white border border-gray-300 mt-1 w-48 rounded shadow-lg z-10">
					{people.map((person, index) => (
						<div
							key={index}
							onClick={() => handleSelect(person)}
							className="p-2 hover:bg-gray-100 cursor-pointer"
						>
							{person.firstName} ({person.id})
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default PersonListDropdown;
