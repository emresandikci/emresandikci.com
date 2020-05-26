import React from 'react';
import { notFound } from 'public/images';
import { Box } from 'esducad-ui';

const NotFound = React.memo(function NotFound() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
      <Box>
        <img src={notFound} alt="not found" width="100%" />
      </Box>
    </Box>
  );
});

export default NotFound;
