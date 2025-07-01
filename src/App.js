import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
	Link,
} from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import PersonList from './components/PersonList';
import CreateChildForm from './components/CreateChildForm';
import CreatePartnerForm from './components/CreatePartnerForm';
import EditPersonForm from './components/EditPersonForm';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import FamilyTree from './components/Dendrogram';

Modal.setAppElement(document.getElementById('modal'));

// BackButton Component
const BackButton = () => {
	const navigate = useNavigate();
	return (
		<button
			onClick={() => navigate(-1)} // Go back to the previous page
			className="flex items-center text-blue-500 font-medium hover:text-blue-700"
		>
			<span className="mr-2">&larr;</span> {/* Unicode for Left Arrow */}
			Back
		</button>
	);
};

function App() {
	return (
		<Router>
			<div className="container mx-auto p-6">
				<h1 className="text-3xl font-bold mb-6">Family Tree</h1>
				<BackButton /> 
				<nav className="mb-4">
					<Link to="/" className="mr-4">
						Person List
					</Link>
					<Link to="/tree" className="mr-4">
						Person Tree
					</Link>
				</nav>
				<Routes>
					<Route path="/" element={<PersonList />} />
					<Route
						path="/tree/"
						element={<FamilyTree />}
					/>
					<Route
						path="/create-child/:parentId"
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
