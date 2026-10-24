import React from 'react';
import { Box } from 'esducad-ui';
import { SocialIcons, Logo, Description, HireMe } from 'components';

function Home() {
  return (
    <Box display="flex" flexDirection="column" justifyContent="space-around" height="100vh">
      <Logo />
      <Description />
      <SocialIcons />
      <HireMe />
    </Box>
  );
}

export default Home;
