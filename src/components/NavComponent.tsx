import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setCurrentViewAction } from '../actions/AppActions';
import { CurrentView } from '../states/AppState';
import { styled } from './FoundationStyles';

const Nav = styled.nav`
  min-width: 250px;
  border-right: 1px solid ${(p): string => p.theme['$color-secondary-1-0']};
  @media screen and (max-width: 748px) {
    display: none;
  }
`;

const List = styled.ul`
  padding: 0;
`;

const ListItem = styled.li`
  list-style: none;
  padding: 7px 0 7px 5px;
  cursor: pointer;
  &:hover {
    background-color: ${(p): string => p.theme['$color-primary-1']};
  }
`;

const NavComponent: React.FC = () => {
  const dispatch = useDispatch();
  const onLinkClickHandler = useCallback(
    (currentView: CurrentView) => {
      dispatch(
        setCurrentViewAction({
          currentView,
        }),
      );
    },
    [dispatch],
  );
  return (
    <Nav>
      <List>
        <ListItem onClick={() => onLinkClickHandler('rooms')}>Rooms</ListItem>
        <ListItem onClick={() => onLinkClickHandler('messages')}>Messages</ListItem>
      </List>
    </Nav>
  );
};

export default NavComponent;
