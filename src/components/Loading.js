import React from 'react';

const Loading = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-white">
			<div className="text-center">
				<div
					className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
					role="status"
				></div>
				<p className="text-gray-700 mt-4">Loading data...</p>
			</div>
		</div>
	);
};

export default Loading;
