import { useEffect, useState, useRef } from 'react';
import { BoxesIcon, BoxIcon, Icon } from '../../../components';
import { formateCustomDate } from '../../transactions';

export function TreeChildCard({ child, lastChild }) {
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
      <TreeBranch svgHeight={svgHeight} lastChild={lastChild} />
      <div className="tree-child-body" ref={cardRef}>
        {/* <div className="insert-child-container">
          <button>
            <BoxesIcon />
          </button>
          <button>
            <BoxIcon />
          </button>
        </div> */}
        <div className="tree-child-content tree">
          <TreeChildContent tree={child} />
        </div>
      </div>
    </div>
  );
}

function TreeChildContent({ tree }) {
  return (
    <>
      <div className="header-row">
        <Icon variant="mind">
          <BoxesIcon />
        </Icon>
        <p> {tree.title}</p>{' '}
      </div>
      <p className='note-section'>{tree.note}</p>
      <p className='timestamp-section'>{formateCustomDate(tree.createdAt)}</p>
    </>
  );
}

function TreeBranch({ svgHeight, lastChild = false }) {
  return (
    <svg width="40" height={svgHeight}>
      {/* Main vertical line */}
      <line
        x1="19"
        y1="0"
        x2="19"
        y2="35"
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
          y1="0"
          x2="19"
          y2={svgHeight}
          stroke="var(--accent-800)"
          strokeWidth="2"
        />
      )}

      {/* Horizontal connector */}
      <line
        x1="19"
        y1="35"
        x2="39"
        y2="35"
        stroke="var(--accent-800)"
        strokeWidth="2"
      />
    </svg>
  );
}
