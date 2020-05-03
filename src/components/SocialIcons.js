import React from 'react';
import { Avatar, Flex, Box } from 'esducad-ui';
import { github, linkedin, twitter, medium } from 'public/images';
import { constant } from 'utils';

const { contact } = constant;
const SocialIcon = ({ src, size, alt, ...props }) => (
  <Avatar
    css={`
      cursor: pointer;
    `}
    src={src}
    alt={alt}
    size={size}
    {...props}
  />
);

const SocialIcons = () => (
  <Flex justifyContent="center" alignItems="center" animation="fadeInDown">
    <Box width={{ _: 1 / 4, xs: 1 / 4, md: 1 / 8 }} textAlign="center">
      <SocialIcon
        src={linkedin}
        size={{ _: 40, md: 60, lg: 80 }}
        alt="likedin-logo"
        onClick={() => window.open(contact.linkedIn)}
      />
    </Box>
    <Box width={{ _: 1 / 4, xs: 1 / 4, md: 1 / 8 }} textAlign="center">
      <SocialIcon
        src={github}
        size={{ _: 40, md: 60, lg: 80 }}
        alt="github-logo"
        onClick={() => window.open(contact.github)}
      />
    </Box>
    <Box width={{ _: 1 / 4, xs: 1 / 4, md: 1 / 8 }} textAlign="center">
      <SocialIcon
        src={medium}
        alt="medium-logo"
        size={{ _: 40, md: 60, lg: 80 }}
        onClick={() => window.open(contact.medium)}
      />
    </Box>
    <Box width={{ _: 1 / 4, xs: 1 / 4, md: 1 / 8 }} textAlign="center">
      <SocialIcon
        src={twitter}
        alt="twitter-logo"
        size={{ _: 40, md: 60, lg: 80 }}
        onClick={() => window.open(contact.twitter)}
      />
    </Box>
  </Flex>
);
export default SocialIcons;
