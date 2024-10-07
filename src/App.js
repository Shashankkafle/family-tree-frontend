import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PersonList from './components/PersonList';
import CreateChildForm from './components/CreateChildForm';
import CreatePartnerForm from './components/CreatePartnerForm';

function App() {
	return (
		<Router>
			<div className="container mx-auto p-6">
				<h1 className="text-3xl font-bold mb-6">Family Tree</h1>
				<nav className="mb-4">
					<Link to="/" className="mr-4">
						Person List
					</Link>
					<Link to="/create" className="mr-4">
						Create Person
					</Link>
				</nav>
				<Routes>
					<Route path="/" element={<PersonList />} />
					<Route
						path="/create-child/:parent"
						element={<CreateChildForm />}
					/>
					<Route
						path="/create-partner/:partner"
						element={<CreatePartnerForm />}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
