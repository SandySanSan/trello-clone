import React from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';
import { Column } from './Column';
import { CustomDragLayerContainer } from './styles';
import { Card } from './Card';

export const CustomDragLayer: React.FunctionComponent = () => {
  const { isDragging, item, currentOffset } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset()
  }));

  if (!isDragging) {
    return null;
  }

  return isDragging ? (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
        {item.type === "COLUMN" ? 
        (<Column
          id={item.id}
          text={item.text}
          index={item.index}
          isPreview={true}
        />) :
          (<Card
            columnId={item.columnId}
            isPreview={true}
            index={0}
            id={item.id}
            text={item.text}
          />)
        }
      </div>
    </CustomDragLayerContainer>
  ) : null;
};

function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {
  if (!currentOffset) {
    return {
      display: "none"
    };
  }
  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform
  };
}