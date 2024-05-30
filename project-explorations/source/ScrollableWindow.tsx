import { Box, Text, useInput } from 'ink';
import React, { useMemo, useState } from 'react';

type Props = {
  windowSize: number
  items: string[]
}

const ScrollableWindow = ({ windowSize, items }: Props) => {
  const initialIndex = Math.floor(windowSize / 2)

  const [windowStart, setWindowStart] = useState(0)
  const [windowEnd, setWindowEnd] = useState(windowSize)
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [selectedItems, setSelectedItems] = useState<boolean[]>(() => items.map(() => true))

  // Scroll the window up or down based on key presses. 
  useInput((_input, key) => {
    if (key.rightArrow) {
      setSelectedItems(selectedItems.map((value, index) => index === (activeIndex + windowStart) ? !value : value))
    }

    if (key.upArrow) {
      if (activeIndex > initialIndex) {
        // If the selected index is not in the center, center it first.
        setActiveIndex(activeIndex - 1)
        return
      }

      if (windowStart === 0) {
        // If the window is at the start, scroll only the selected index if it too is not at the start.
        if (activeIndex > 0) {
          setActiveIndex(activeIndex - 1)
        }
        return
      }

      // Scroll the window.
      setWindowStart(windowStart - 1)
      setWindowEnd(windowEnd - 1)
    }

    if (key.downArrow) {
      if (activeIndex < initialIndex) {
        // If the selected index is not in the center, center it first.
        setActiveIndex(activeIndex + 1)
        return
      }

      if (windowEnd === items.length) {
        // If the window is at the end, scroll only the selected index if it too is not at the end.
        if (activeIndex < windowSize - 1) {
          setActiveIndex(activeIndex + 1)
        }
        return
      }

      // Scroll the window.
      setWindowStart(windowStart + 1)
      setWindowEnd(windowEnd + 1)
    }
  });

  const displayedItems = useMemo(() => {
    return items.slice(windowStart, windowEnd).map((item, index) => {
      const itemIndex = windowStart + index;

      return <Text
        color={activeIndex === index ? 'red' : 'black'}
        key={index}>{item} {selectedItems[itemIndex] ? "[Selected]" : '[Not Selected]'}</Text>
    });
  }, [windowStart, windowEnd, activeIndex, selectedItems]);

  return (
    <Box flexDirection='column'>
      {displayedItems}
    </Box>
  );
}

export default ScrollableWindow;

