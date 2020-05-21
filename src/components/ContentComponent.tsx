import React from 'react';

import { styled } from './FoundationStyles';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;

const ContentComponent: React.FC = (props) => {
  return <Content>{props?.children}</Content>;
};

export default ContentComponent;
