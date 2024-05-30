import { Box, Text } from "ink";
import SelectInput from 'ink-select-input';
import React from "react";

type Option<T> = { label: string, value: T }

type Props<T> = {
  options: Option<T>[]
  callback: (value: T) => void
  label?: string
  isFocused?: boolean
}

const Menu = <T extends string | number>({ options, callback, label, isFocused }: Props<T>) => {
  const handleSelect = ({ value }: Option<T>) => {
    callback(value)
  }

  return (
    <Box flexDirection="column">
      {label && <Box>
        <Text>{label}</Text>
      </Box>
      }
      <SelectInput items={options} onSelect={handleSelect} isFocused={isFocused} />
    </Box>
  );
}

export default Menu;