import { Box } from 'ink';
import Color from 'ink-color-pipe';
import React, { useContext } from 'react';
import { context } from '../context.js';


const Error = () => {
  const { state: { errorMessage } } = useContext(context)

  if (!errorMessage) return null

  return (
    <Box>
      <Color styles="bgRed.white">Error: {errorMessage}</Color>
    </Box>
  )
}

export default Error;