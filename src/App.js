import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import PersonList from './components/PersonList';
import CreateChildForm from './components/CreateChildForm';
import CreatePartnerForm from './components/CreatePartnerForm';
import EditPersonForm from './components/EditPersonForm';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement(document.getElementById('modal'));

function App() {
	return (
		<Router>
			<div className="container mx-auto p-6">
				<h1 className="text-3xl font-bold mb-6">Family Tree</h1>
				<Routes>
					<Route path="/" element={<PersonList />} />
					<Route
						path="/create-child/:parent"
						element={<CreateChildForm />}
					/>
					<Route
						path="/edit-person/:id"
						element={<EditPersonForm />}
					/>
					<Route
						path="/create-partner/:partner"
						element={<CreatePartnerForm />}
					/>
				</Routes>
			</div>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
				transition={Bounce}
			/>
		</Router>
	);
}

export default App;
