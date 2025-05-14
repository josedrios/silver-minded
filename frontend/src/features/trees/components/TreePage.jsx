import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTree, TreeHeader } from '../';
import { SlashLoader, PlusIcon } from '../../../components';

export default function TreePage({}) {
  const { id } = useParams();
  const [tree, setTree] = useState(null);

  useEffect(() => {
    const loadTree = async () => {
      const data = await fetchTree(id);
      setTree(data);
    };
    loadTree();
  }, [id]);

  return (
    <div className="tree-page">
      {tree ? <TreeHeader tree={tree} setTree={setTree} /> : <SlashLoader />}
      <div className="tree-children-container">
        <TreeChildCard />
      </div>
    </div>
  );
}

function TreeChildCard() {
   const cardRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setSvgHeight(entry.contentRect.height + 15);
    });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);


  return (
    <div className="tree-child-card">
      <svg width="40" height={svgHeight}>
        {/* Main vertical line */}
        <line
          x1="19"
          y1="0"
          x2="19"
          y2="40"
          stroke="var(--accent-800)"
          strokeWidth="2"
        />

        {/* Optional vertical extension */}
        <line
          className="optional"
          x1="19"
          y1="40"
          x2="19"
          y2={svgHeight}
          stroke="var(--accent-800)"
          strokeWidth="2"
        />

        {/* Horizontal connector */}
        <line
          x1="19"
          y1="40"
          x2="39"
          y2="40"
          stroke="var(--accent-800)"
          strokeWidth="2"
        />
      </svg>
      <div className="tree-child-body" ref={cardRef}>
        <button className="add-child-button">
          <PlusIcon />
        </button>
        <div className="tree-child-content"></div>
      </div>
    </div>
  );
}
