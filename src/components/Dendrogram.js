import React, { useEffect, useMemo, useState } from 'react';
import { Group } from '@visx/group';
import { Cluster, hierarchy } from '@visx/hierarchy';
import { LinkVertical } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
import PersonCard from './PersonCard';
import { useParentSize, useScreenSize } from '@visx/responsive';

const citrus = '#ddf163';
const white = '#ffffff';
export const green = '#79d259';
const aqua = '#37ac8c';
const merlinsbeard = '#f7f7f3';
export const background = '#306c90';
const clusterData = 
	{
	  "id": 1,
	  "firstName": "Lokanath",
	  "parentId": null,
	  "isRoot": true,
	  "partnerId": null,
	  "children": [
		{
		  "id": 2,
		  "firstName": "Mukunda Prashad",
		  "parentId": 1,
		  "isRoot": false,
		  "partnerId": null,
		  "children": [
			{
			  "id": 3,
			  "firstName": "Sampat Kumar",
			  "parentId": 2,
			  "isRoot": false,
			  "partnerId": 6,
			  "children": [
				
			  ],
			  "partner": {
				"id": 6,
				"firstName": "Subhadra Kumari ",
				"parentId": null,
				"isRoot": false,
				"partnerId": 3,
				"children": [
				  {
					"id": 7,
					"firstName": "Shashank",
					"parentId": 3,
					"isRoot": false,
					"partnerId": null,
					"children": [
					  
					]
				  }
				]
			  }
			}
		  ]
		}
	  ]
	}
  
// const clusterData = {
// 	name: '$',
// 	children: [
// 		{
// 			name: 'A',
// 			children: [
// 				{ name: 'A1' },
// 				{ name: 'A2' },
// 				{
// 					name: 'C',
// 					children: [
// 						{
// 							name: 'C1',
// 						},
// 					],
// 				},
// 			],
// 		},
// 		{
// 			name: 'B',
// 			children: [{ name: 'B1' }, { name: 'B2' }, { name: 'B3' }],
// 		},
// 		{
// 			name: 'X',
// 			children: [
// 				{
// 					name: 'Z',
// 				},
// 			],
// 		},
// 	],
// };



function RootNode({ node }) {
	const width = 50;
	const height = 50;
	const centerX = -width / 2;
	const centerY = -height / 2;

	return (
		<Group top={node.y} left={node.x}>
			{/* <rect
				width={width}
				height={height}
				y={centerY}
				x={centerX}
				fill="url('#top')"
			/>
			<text
				dy=".33em"
				fontSize={9}
				fontFamily="Arial"
				textAnchor="middle"
				style={{ pointerEvents: 'none' }}
				fill={background}
			>
				{node.data.name}
			</text> */}
			asd
			<rect
				width={width}
				height={height}
				y={centerY}
				x={centerX}
				fill="url('#top')"
			/>
		</Group>
	);
}

function Node({ node }) {
	const isRoot = node.depth === 0;
	const isParent = !!node.children;
	if (isRoot) return <RootNode node={node} />;

	return (
		<Group top={node.y} left={node.x}>
			{node.depth !== 0 && (
				<circle
					r={12}
					fill={background}
					stroke={isParent ? white : citrus}
					onClick={() => {
						alert(`clicked: ${JSON.stringify(node.data.firstName)}`);
					}}
				/>
			)}
			<text
				dy=".33em"
				fontSize={9}
				fontFamily="Arial"
				textAnchor="middle"
				style={{ pointerEvents: 'none' }}
				fill={isParent ? white : citrus}
			>
				{node.data.firstName}
			</text>
		</Group>
	);
}

const defaultMargin = { top: 20, left: 20, right: 20, bottom: 20 };

export default function FamilyTree({  margin = defaultMargin }) {
	const chartWidth = 2000;
	const chartHeight = 1000;
	// const { parentRef, width, height } = useParentSize({ debounceTime: 150 });	// Inside App component
	// const [width, height] = useWindowSize();
	// const [dimensions, setDimensions] = useState({
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    // });
    // useEffect(() => {
    //     const handleResize = () => {
    //         setDimensions({
    //             width: window.innerWidth,
    //             height: window.innerHeight,
    //         });
    //     };
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

	const data = useMemo(() => hierarchy(clusterData), []);
	console.log("data",data)
	const xMax = chartWidth - margin.left - margin.right;
	const yMax = chartHeight - margin.top - margin.bottom;

	// console.log("1",width,height)
	return ( 
			<div style={{
				width: '100vw',
				height: '100vh',
				overflow: 'scroll',
				background: background,
			}}>
				<svg width={chartWidth} height={chartHeight}>
					<LinearGradient id="top" from={green} to={aqua} />
					<rect width={chartWidth} height={chartHeight} rx={14} fill={background} />
					<Cluster root={data} size={[xMax, yMax]}>
						{(cluster) => (
							<Group top={margin.top} left={margin.left}>
								{console.log("cluster.links(),cluster.descendants()",cluster.links(), cluster.descendants())}
								{cluster.links().map((link, i) => (
									<LinkVertical
										key={`cluster-link-${i}`}
										data={link}
										stroke={merlinsbeard}
										strokeWidth="1"
										strokeOpacity={0.8}
										fill="none"
									/>
								))}
								{cluster.descendants().map((node, i) => (
									<Node key={`cluster-node-${i}`} node={node} />
								))}
							</Group>
						)}
					</Cluster>
				</svg>
			</div>
		)
		
}
