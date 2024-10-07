import React from 'react';
import PersonList from './components/PersonList';
import CreatePersonForm from './components/CreatePersonForm';

function App() {
	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Family Tree</h1>
			<CreatePersonForm />
			<PersonList />
		</div>
	);
}

export default App;
