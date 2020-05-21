import React from 'react';

import { styled } from './FoundationStyles';

const Footer = styled.footer`
  text-align: center;
  height: 30px;
  background-color: ${(p): string => p.theme['$color-primary-0']};
  color: ${(p): string => p.theme.FOREGROUND_REVERSE};
`;

const FooterComponent: React.FC = () => <Footer>Footer</Footer>;

export default FooterComponent;
