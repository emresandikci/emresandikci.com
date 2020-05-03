import React from 'react';
import { Button, Box } from 'esducad-ui';
import { constant } from 'utils';
const {
  contact: { email },
} = constant;
const HireMe = () => (
  <Box display="flex" justifyContent="center" animation="fadeInDown">
    <Button
      variant="outline"
      width={{ _: 1 / 2, md: 1 / 3, lg: 1 / 5 }}
      fontSize={{ _: '15px', md: '30px', lg: '30px' }}
      fontWeight="normal"
      css={`
        text-transform: none;
        font-family: 'arial';
        box-shadow: none;
        border: 3px solid #000;
      `}
      onClick={() => (window.location.href = `mailto:${email}?subject=I want to hire you`)}
    >
      {'<'} Hire me {'>'}
    </Button>
  </Box>
);

export default HireMe;
