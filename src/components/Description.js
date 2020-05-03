import React from 'react';
import { Box, Text } from 'esducad-ui';

const Description = () => (
  <Box m="0 auto" fontSize={{ _: '30px', md: '70px', lg: '90px' }} animation="fadeInDown">
    <Text fontSize="100%" color="#000">
      {'<Hi/>,'} <br />
      I’m {'<Emre/>'} <br /> Full-stack {'<Developer/>'}
    </Text>
  </Box>
);

export default Description;
