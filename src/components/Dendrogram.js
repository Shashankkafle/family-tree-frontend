import React, { useEffect, useMemo, useState } from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { graphStratify, sugiyama, layeringSimplex, decrossTwoLayer, coordCenter } from 'd3-dag';
import axios from 'axios';

function Node({ node }) {
	console.log("node.data", node);
	return (
		<Group top={node.y} left={node.x}>

				<circle
					r={12}
					fill='#306c90'
					onClick={() => {
						alert(`clicked: ${JSON.stringify(node.data.id)}`);
					}}
				/>

			<text
				dy=".33em"
				fontSize={9}
				fontFamily="Arial"
				textAnchor="middle"
				style={{ pointerEvents: 'none' }}
			>
				{node.data.id}
			</text>
		</Group>
	);
}

const defaultMargin = { top: 20, left: 20, right: 20, bottom: 20 };

export default function FamilyTree({  margin = defaultMargin }) {
	const [people, setPeople] = useState([]);
	async function fetchAllPerson() {
		const list = await axios.get(process.env.REACT_APP_API_URL + '/person');
		console.log('list', list.data);
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
			id: String(person.id),
			parentIds: person.parents?.map(p => String(p.id)) || [],
			data: person,
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
	return {
		nodes: [...dag.nodes()],
		links: [...dag.links()],
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
						{dag.nodes.map((node, i) => (
							<Node node={node} key={`node-${i}`} />
						))}
					</Group>
				</svg>
			</div>
		)
		
}
