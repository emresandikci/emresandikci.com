import React from 'react';
import { Box, Avatar } from 'esducad-ui';
import { logo } from 'public/images';

const Logo = () => (
  <Box
    position={{ _: 'static', lg: 'absolute' }}
    right="0"
    top="0"
    textAlign="center"
    animation="bounce"
  >
    <Avatar src={logo} size={150} alt="emresandikci-logo" />
  </Box>
);

export default Logo;
