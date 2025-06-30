const TextField = ({ label, name, value, onChange }) => {
	return (
		<div className="mb-4">
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
export default TextField;