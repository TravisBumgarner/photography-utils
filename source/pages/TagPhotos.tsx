import { Box, Text } from "ink";
import React from "react";

import { useAsyncEffect } from "use-async-effect";
import { BasePageProps } from "../types.js";

type PageProps = {

}

const PageComputeMissing = ({ }: PageProps & BasePageProps) => {
  const getPhotos = async () => {
  }

  useAsyncEffect(async () => await getPhotos(), [])

  return (
    <Box flexDirection="column">
      <Text>
        Hi.
      </Text>
    </Box>
  );
}

export default PageComputeMissing;