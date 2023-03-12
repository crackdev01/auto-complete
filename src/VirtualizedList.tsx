import React, { useState, useCallback, useMemo } from 'react';

type Props = {
  data: string[];
  onSelect: (item: string) => void;
  renderItem: (item: string) => JSX.Element;
}

const rowHeight = 30;   //  Assume row height of 30px
const containerHeight = 200; //  Assume row container height of 200px
const bufferedItems = 2;

function VirtualizedList({ data, onSelect, renderItem }: Props) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleOnScroll = useCallback((e: React.UIEvent) => {
    setScrollPosition(e.currentTarget.scrollTop);
  }, []);

  const handleItemClick = useCallback((item: string) => {
    onSelect(item)
  }, [onSelect]);

  const renderList = useMemo(() => {
    const startIndex = Math.max(
      Math.floor(scrollPosition / rowHeight) - bufferedItems,
      0
    );
    const endIndex = Math.min(
      Math.ceil((scrollPosition + containerHeight) / rowHeight - 1) + bufferedItems,
      data.length - 1
    );

    return data.slice(startIndex, endIndex + 1).map((item, index) =>
      <li
        key={index} 
        style={{ position: 'absolute', height: `${rowHeight}px`, top: (startIndex + index) * rowHeight }}
        onClick={() => handleItemClick(item)}
      >
        {renderItem(item)}
      </li>
    );
  }, [data, scrollPosition, renderItem, handleItemClick]);

  return (
    <ul style={{ height: `${Math.min(containerHeight, rowHeight * data.length)}px`}} onScroll={handleOnScroll}>
      {renderList}
    </ul>
  );
}

export default VirtualizedList;
