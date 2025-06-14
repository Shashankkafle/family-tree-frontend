import React, { useEffect, useMemo, useState } from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { graphStratify, sugiyama, layeringSimplex,layeringLongestPath, decrossTwoLayer, coordCenter } from 'd3-dag';
import axios from 'axios';

function Node({ node }) {
	return (
		<Group top={node.y} left={node.x}>

				<circle
					r={12}
					fill='#306c90'
					onClick={() => {
						alert(`clicked: ${JSON.stringify(node.data.data.id)}`);
					}}
				/>

			<text
				dy=".33em"
				fontSize={9}
				fontFamily="Arial"
				textAnchor="middle"
				style={{ pointerEvents: 'none' }}
			>
				{node.data.data.id}
			</text>
		</Group>
	);
}

const defaultMargin = { top: 20, left: 20, right: 20, bottom: 20 };
const people =[
	{
	  "id": 3,
	  "firstName": "Alice",
	  "lastName": "Doe",
	  "email": "alice.johnson@example.com",
	  "profession": "Teacher",
	  "permanentAddress": "234 Maple St",
	  "currentAddress": "567 Birch St",
	  "phoneNumber": "555-555-5555",
	  "image": null,
	  "birthDate": "2010-10-10T00:00:00.000Z",
	  "deathDate": null,
	  "gender": "female",
	  "isRoot": false,
	  "generation": 1,
	  "createdAt": "2025-06-03T10:51:56.511Z",
	  "updatedAt": "2025-06-03T10:51:56.511Z",
	  "partners": [
		
	  ],
	  "parents": [
		1,2
	  ]
	},
	{
	  "id": 5,
	  "firstName": "Charlie",
	  "lastName": "Brown",
	  "email": "charlie.davis@example.com",
	  "profession": "Musician",
	  "permanentAddress": "456 Willow St",
	  "currentAddress": "789 Fir St",
	  "phoneNumber": "333-333-3333",
	  "image": null,
	  "birthDate": "2015-03-03T00:00:00.000Z",
	  "deathDate": null,
	  "gender": "male",
	  "isRoot": false,
	  "generation": 2,
	  "createdAt": "2025-06-03T10:51:56.511Z",
	  "updatedAt": "2025-06-03T10:51:56.511Z",
	  "partners": [
		9, 7
	  ],
	  "parents": [
	   3,4
	  ]
	},
	{
	  "id": 7,
	  "firstName": "Mary",
	  "lastName": "Davis",
	  "email": "mary.davis@example.com",
	  "profession": "Composer",
	  "permanentAddress": "456 Willow St",
	  "currentAddress": "789 Fir St",
	  "phoneNumber": "333-333-3633",
	  "image": null,
	  "birthDate": "2015-03-03T00:00:00.000Z",
	  "deathDate": null,
	  "gender": "male",
	  "isRoot": false,
	  "generation": 2,
	  "createdAt": "2025-06-03T10:51:56.511Z",
	  "updatedAt": "2025-06-03T10:51:56.511Z",
	  "partners": [
		
	  ],
	  "parents": [
	   3,6
	  ]
	},
	{
	  "id": 2,
	  "firstName": "Jane",
	  "lastName": "Doe",
	  "email": "jane.smith@example.com",
	  "profession": "Doctor",
	  "permanentAddress": "789 Oak St",
	  "currentAddress": "101 Pine St",
	  "phoneNumber": "987-654-3210",
	  "image": null,
	  "birthDate": "1985-05-05T00:00:00.000Z",
	  "deathDate": null,
	  "gender": "female",
	  "isRoot": false,
	  "generation": 0,
	  "createdAt": "2025-06-03T10:51:56.511Z",
	  "updatedAt": "2025-06-03T10:51:56.511Z",
	  "partners": [
		1
	  ],
	  "parents": [
		
	  ]
	},
	{
	  "id": 6,
	  "firstName": "Ted",
	  "lastName": "Davis",
	  "email": "ted.davis@example.com",
	  "profession": "Musician",
	  "permanentAddress": "456 Willow St",
	  "currentAddress": "789 Fir St",
	  "phoneNumber": "333-333-3373",
	  "image": null,
	  "birthDate": "2015-03-03T00:00:00.000Z",
	  "deathDate": null,
	  "gender": "male",
	  "isRoot": false,
	  "generation": 1,
	  "createdAt": "2025-06-03T10:51:56.511Z",
	  "updatedAt": "2025-06-03T10:51:56.511Z",
	  "partners": [
		3
	  ],
	  "parents": [
		
	  ]
	},
	{
	  "id": 4,
	  "firstName": "Bob",
	  "lastName": "Brown",
	  "email": "bob.brown@example.com",
	  "profession": "Artist",
	  "permanentAddress": "345 Cedar St",
	  "currentAddress": "678 Spruce St",
	  "phoneNumber": "444-444-4444",
	  "image": null,
	  "birthDate": "2012-12-12T00:00:00.000Z",
	  "deathDate": null,
	  "gender": "male",
	  "isRoot": false,
	  "generation": 1,
	  "createdAt": "2025-06-03T10:51:56.511Z",
	  "updatedAt": "2025-06-03T10:51:56.511Z",
	  "partners": [
		3
	  ],
	  "parents": [
		
	  ]
	},
	{
	  "id": 1,
	  "firstName": "John",
	  "lastName": "Doe",
	  "email": "john.doe@example.com",
	  "profession": "Engineer",
	  "permanentAddress": "123 Main St",
	  "currentAddress": "456 Elm St",
	  "phoneNumber": "123-456-7890",
	  "image": null,
	  "birthDate": "1980-01-01T00:00:00.000Z",
	  "deathDate": null,
	  "gender": "male",
	  "isRoot": true,
	  "generation": 0,
	  "createdAt": "2025-06-03T10:51:56.511Z",
	  "updatedAt": "2025-06-03T10:51:56.511Z",
	  "partners": [
		2
	  ],
	  "parents": [
		
	  ]
	},
	{
	  "id": 9,
	  "firstName": "Mariella",
	  "lastName": "Gabriel",
	  "email": null,
	  "profession": null,
	  "permanentAddress": null,
	  "currentAddress": null,
	  "phoneNumber": null,
	  "image": null,
	  "birthDate": "2015-10-13T00:00:00.000Z",
	  "deathDate": null,
	  "gender": "female",
	  "isRoot": false,
	  "generation": 3,
	  "createdAt": "2025-06-07T00:56:23.455Z",
	  "updatedAt": "2025-06-07T00:56:23.455Z",
	  "partners": [
		5
	  ],
	  "parents": [
		
	  ]
	}
  ]

export default function FamilyTree({  margin = defaultMargin }) {
	// const [people, setPeople] = useState([]);
	async function fetchAllPerson() {
		// const list = await axios.get(process.env.REACT_APP_API_URL + '/person');
		// setPeople(list.data);
	}

	useEffect(() => {
		fetchAllPerson();
	}, []);

  const dag = useMemo(() => {
    if (!people) return null;
	//Flatten data into a map (id → person)
	const nodeMap = new Map();
	for (const person of people) {
		nodeMap.set(person.id, person);
	}
	function getPartnerParents(person){
		const parents = person.partners?.flatMap((p)=>{
			const partner = nodeMap.get(p);
			return partner.parents.map(p=> String(p));
		})
		return parents
	}
	//Convert to required format: [{ id:int, parentIds:int[] }]
	const formatted = [];
	for (const person of nodeMap.values()) {
		const formattedValue = {
			data:{...person},
			id: String(person.id),
			parentIds: person.parents.length ? person.parents?.flatMap(p => String(p)) : getPartnerParents(person),
			// isDirectChild:person.parents.length? true: false,
			partners: person.partners?.map(p => String(p)) || [],
		}
		formatted.push(formattedValue);

	}
	//Build DAG(Directed Acyclic Graph) from formatted structure(this gives us the position of each node)
	const dag = graphStratify()(formatted);

	//Apply Sugiyama layout
	const layout = sugiyama()
	.layering(layeringSimplex())
	.decross(decrossTwoLayer())
	.coord(coordCenter())
	.nodeSize(() => [100, 100]);

	layout(dag)
	// 🔍 Build a lookup map from node id to DAG node
	const idToNode = {};
	const nodes = [...dag.nodes()]
	for (const node of nodes) {
		idToNode[node.data.id] = node;
	}
	const partnerLinks = [];
	const links = [];
	for (const person of nodeMap.values()) {
	  if (person.partners) {
		for (const partner of person.partners) {
		  const sourceId = String(person.id);
		  const targetId = String(partner);
  

			partnerLinks.push({
			  source: idToNode[sourceId],
			  target: idToNode[targetId],
			  type: 'partner',
			});
		  
		}
	  }
	}
	return {
		nodes,
		links: [...dag.links()],
		partnerLinks
	  }
  }, [people]);
	
	const chartWidth = 2000;
	const chartHeight = 1000;

	return ( 
			<div style={{
				width: '100vw',
				height: '100vh',
				overflow: 'scroll',
				background: '#306c90',
			}}>
				<svg width={chartWidth} height={chartHeight}>
					<rect width={chartWidth} height={chartHeight} rx={14} fill='#306c90' />
					<Group top={20} left={20}>
						{dag.links.map((link, i) =>{ 
							if(link.target.data.data.parents.length)
								{
									return <LinePath
									key={`link-${i}`}
									data={link.points}
									x={d => d[0]}
									y={d => d[1]}
									stroke="#ccc"
									strokeWidth={1.5}
								/>
							}
						
						})}
						{dag.partnerLinks.map((link, i) => 
						(	<LinePath
							key={`partner-link-${i}`}
							x={d => d.x}
							y={d => d.y}
							data={[link.source, link.target]}
							stroke="blue"
							strokeWidth={2}
							strokeDasharray="4,2" // dashed style to distinguish from parent links
							curve={null} // or use curveStep, curveMonotoneX, etc. for styling
						  />)
						)}
						{dag.nodes.map((node, i) => (
							<Node node={node} key={`node-${i}`} />
						))}
					</Group>
				</svg>
			</div>
		)
		
}
