import React, { useEffect, useMemo, useState } from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { graphStratify, sugiyama, layeringSimplex, decrossTwoLayer, coordCenter } from 'd3-dag';
import axios from 'axios';

function Node({ node }) {
	return (
		<Group top={node.y} left={node.x}>

				<circle
					r={12}
					fill='#306c90'
					onClick={() => {
						alert(`clicked: ${JSON.stringify(node.data.firstName)}`);
					}}
				/>

			<text
				dy=".33em"
				fontSize={9}
				fontFamily="Arial"
				textAnchor="middle"
				style={{ pointerEvents: 'none' }}
			>
				{node.data.firstName}
			</text>
		</Group>
	);
}

const defaultMargin = { top: 20, left: 20, right: 20, bottom: 20 };

export default function FamilyTree({  margin = defaultMargin }) {
	const [people, setPeople] = useState([]);
	async function fetchAllPerson() {
		const list = await axios.get(process.env.REACT_APP_API_URL + '/person');
		setPeople(list.data);
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
	//Convert to required format: [{ id:int, parentIds:int[] }]
	const formatted = [];
	for (const person of nodeMap.values()) {
		formatted.push({
			...person, 
			id: String(person.id),
			parentIds: person.parents?.map(p => String(p.id)) || [],
		});

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
	for (const person of nodeMap.values()) {
	  if (person.partners) {
		for (const partner of person.partners) {
		  const sourceId = String(person.id);
		  const targetId = String(partner.id);
  

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
						{dag.links.map((link, i) => (
							<LinePath
							key={`link-${i}`}
							data={link.points}
							x={d => d[0]}
							y={d => d[1]}
							stroke="#ccc"
							strokeWidth={1.5}
							/>
						))}
						{dag.partnerLinks.map((link, i) => (
							<LinePath
							key={`partner-link-${i}`}
							x={d => d.x}
							y={d => d.y}
							data={[link.source, link.target]}
							stroke="blue"
							strokeWidth={2}
							strokeDasharray="4,2" // dashed style to distinguish from parent links
							curve={null} // or use curveStep, curveMonotoneX, etc. for styling
						  />
						))}
						{dag.nodes.map((node, i) => (
							<Node node={node} key={`node-${i}`} />
						))}
					</Group>
				</svg>
			</div>
		)
		
}
