import { Box, Text } from 'ink';
import React, { useMemo } from 'react';

type Props = {
  windowSize: number
  items: string[]
}

const TailWindow = ({ windowSize: desiredWindowSize, items }: Props) => {
  const windowSize = Math.min(desiredWindowSize, items.length)

  const windowStart = items.length - windowSize;

  const displayedItems = useMemo(() => {
    return items.slice(windowStart).map((item, index) => {
      return <Text key={index}>{item}</Text>
    });
  }, [windowStart, items]);

  return (
    <Box flexDirection='column'>
      {displayedItems}
    </Box>
  );
}

export default TailWindow;