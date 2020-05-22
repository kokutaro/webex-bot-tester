import { CircularProgress, IconButton } from '@material-ui/core';

import { styled } from './FoundationStyles';

export const Mono = styled.pre`
  font-family: 'Consolas';
  font-size: 75%;
`;

export const Title = styled.div`
  font-size: 75%;
  color: #555;
`;

export const List = styled.ul`
  padding: 0;
`;

export const ListItem = styled.li`
  list-style: none;
  padding: 7px 0 7px 5px;
  border-bottom: 1px solid #ddd;
`;

export const SideIconButton = styled(IconButton)`
  float: right;
`;

export const Loading = styled(CircularProgress)`
  text-align: center;
  width: 100%;
`;
