import { useEffect, useState, useRef } from 'react';
import { BoxesIcon, BoxIcon } from '../../../components';

export function TreeChildCard() {
  const cardRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setSvgHeight(entry.contentRect.height + 5);
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
      <TreeBranch svgHeight={svgHeight} />
      <div className="tree-child-body" ref={cardRef}>
        <div className="insert-child-container">
          <button>
            <BoxesIcon />
            Tree
          </button>
          <button>
            <BoxIcon />
            Node
          </button>
        </div>
        <div className="tree-child-content"></div>
      </div>
    </div>
  );
}

function TreeBranch({ svgHeight, lastChild = true }) {
  return (
    <svg width="40" height={svgHeight}>
      {/* Main vertical line */}
      <line
        x1="19"
        y1="0"
        x2="19"
        y2="50"
        stroke="var(--accent-800)"
        strokeWidth="2"
      />

      {/* Optional vertical extension */}
      {lastChild ? (
        ''
      ) : (
        <line
          className="optional"
          x1="19"
          y1="40"
          x2="19"
          y2={svgHeight}
          stroke="var(--accent-800)"
          strokeWidth="2"
        />
      )}

      {/* Horizontal connector */}
      <line
        x1="19"
        y1="50"
        x2="39"
        y2="50"
        stroke="var(--accent-800)"
        strokeWidth="2"
      />
    </svg>
  );
}
