import React from 'react';

const PersonListDropdown = ({ people, onSelect }) => {
	const handleSelect = (person) => {
		onSelect(person.id); // send selected ID to parent
	};

	return (
		<div className="dropdown relative">
			<button className="dropdown-button">Select a Person</button>
			<div className="dropdown-content absolute bg-white border mt-2 w-48 rounded shadow-lg z-10">
				{people.map((person, index) => (
					<div
						key={index}
						onClick={() => handleSelect(person)}
						className="p-2 hover:bg-gray-200 cursor-pointer"
					>
						{person.firstName} ({person.id})
					</div>
				))}
			</div>
		</div>
	);
};

export default PersonListDropdown;
