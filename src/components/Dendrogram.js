import React, { useEffect, useMemo, useState } from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import {
  graphStratify,
  sugiyama,
  layeringSimplex,
  decrossOpt,
  coordCenter
} from 'd3-dag';
import { useParentSize } from '@visx/responsive';
import axios from 'axios';

function Node({ node, width = 80, height = 100 }) {
	const person = node.data.data;
	const imageUrl = person.imageUrl || 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ54FddBETZ5zkPWqjUwTUf7Er18LgEgqiLD5u9WMsrujZeMXbd7KsrF1GT6HLuhtWS8RQ713NF-zLaWsBETWokl0uwAzdFez4CdzC_NS4'; // fallback
  
	const imageHeight = height * 0.7;
	const textHeight = height * 0.3;
  
	return (
	  <Group top={node.y} left={node.x}>
		{/* Center the node card */}
		<foreignObject x={-width / 2} y={-height / 2} width={width} height={height}>
		  <div
			xmlns="http://www.w3.org/1999/xhtml"
			style={{
			  width: '100%',
			  height: '100%',
			  border: '1px solid #ccc',
			  borderRadius: 8,
			  background: 'white',
			  overflow: 'hidden',
			  display: 'flex',
			  flexDirection: 'column',
			  alignItems: 'center',
			  textAlign: 'center',
			  fontFamily: 'Arial'
			}}
		  >
			<img
			  src={imageUrl}
			  alt={person.firstName}
			  style={{
				width: '100%',
				height: imageHeight,
				objectFit: 'cover'
			  }}
			/>
			<div
			  style={{
				padding: '2px 4px',
				fontSize: 10,
				height: textHeight,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: '#f5f5f5',
				width: '100%'
			  }}
			>
			  {person.firstName}
			</div>
		  </div>
		</foreignObject>
	  </Group>
	);
  }

export default function FamilyTree() {
	
  const [people, setPeople] = useState([]);
  const { parentRef, width = 800, height = 600 } = useParentSize({ debounceTime: 150 });

  useEffect(() => {
    async function fetchAllPerson() {
      const list = await axios.get(process.env.REACT_APP_API_URL + '/person');
      setPeople(list.data);
    }
    fetchAllPerson();
  }, []);

  const dag = useMemo(() => {
    if (!people.length) return null;

    const nodeMap = new Map(people.map(p => [p.id, p]));

    function getPartnerParents(person) {
      const parents = person.partners?.flatMap(partner =>
        nodeMap.get(partner.id)?.parents.map(p => String(p.id))
      );
      return parents || [];
    }

    const formatted = people.map(person => ({
      data: { ...person },
      id: String(person.id),
      parentIds: person.parents.length
        ? person.parents.map(p => String(p.id))
        : getPartnerParents(person),
      partners: person.partners?.map(p => String(p.id)) || []
    }));

    const dag = graphStratify()(formatted);

    const layout = sugiyama()
      .layering(layeringSimplex())
      .decross(decrossOpt())
      .coord(coordCenter())
      .nodeSize(() => [200, 200]);

    layout(dag);

    const idToNode = {};
    const nodes = [...dag.nodes()];
    for (const node of nodes) {
      idToNode[node.data.id] = node;
    }

    const partnerLinks = [];
    for (const person of nodeMap.values()) {
      for (const partner of person.partners || []) {
        partnerLinks.push({
          source: idToNode[String(person.id)],
          target: idToNode[String(partner.id)]
        });
      }
    }

    return {
      nodes,
      links: [...dag.links()],
      partnerLinks
    };
  }, [people]);

  if (!dag || !width || !height) return <div ref={parentRef} style={{ width: '100%', height: '600px' }} />;

  // Compute DAG bounds
  const bounds = dag.nodes.reduce(
    (acc, node) => {
      acc.minX = Math.min(acc.minX, node.x);
      acc.maxX = Math.max(acc.maxX, node.x);
      acc.minY = Math.min(acc.minY, node.y);
      acc.maxY = Math.max(acc.maxY, node.y);
      return acc;
    },
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
  );

  const dagWidth = bounds.maxX - bounds.minX;
  const dagHeight = bounds.maxY - bounds.minY;
  const padding = 40;

  const scale = Math.min(
    (width - 2 * padding) / dagWidth,
    (height - 2 * padding) / dagHeight
  );

  const scaleX = x => (x - bounds.minX) * scale + padding;
  const scaleY = y => (y - bounds.minY) * scale + padding;
  const scalePoint = ([x, y]) => [scaleX(x), scaleY(y)];

  return (
    <div ref={parentRef} style={{ width: '100%', height: '100%' }}>
      <svg width={width} height={height}>
        <rect width={width} height={height} rx={14} fill="#306c90" />
        <Group>
          {dag.links.map((link, i) =>
            link.target.data.data.parents.length ? (
              <LinePath
                key={`link-${i}`}
                data={link.points.map(scalePoint)}
                x={d => d[0]}
                y={d => d[1]}
                stroke="#ccc"
                strokeWidth={1.5}
              />
            ) : null
          )}
          {dag.partnerLinks.map((link, i) => (
            <LinePath
              key={`partner-link-${i}`}
              data={[
                { x: scaleX(link.source.x), y: scaleY(link.source.y) },
                { x: scaleX(link.target.x), y: scaleY(link.target.y) }
              ]}
              x={d => d.x}
              y={d => d.y}
              stroke="blue"
              strokeWidth={2}
              strokeDasharray="4,2"
            />
          ))}
          {dag.nodes.map((node, i) => (
            <Node
              key={`node-${i}`}
              node={{
                ...node,
                x: scaleX(node.x),
                y: scaleY(node.y)
              }}
              radius={12 * scale}
            />
          ))}
        </Group>
      </svg>
    </div>
  );
}
