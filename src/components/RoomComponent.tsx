import { CircularProgress, IconButton } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRooms } from '../actions/RoomActions';
import { getTeams } from '../actions/TeamActions';
import { RoomState } from '../states/RoomState';
import { State } from '../states/State';
import { TeamState } from '../states/TeamState';
import { styled } from './FoundationStyles';

const Mono = styled.pre`
  font-family: 'Consolas';
  font-size: 75%;
`;

const Title = styled.div`
  font-size: 50%;
  color: #555;
`;

const List = styled.ul`
  padding: 0;
`;

const ListItem = styled.li`
  list-style: none;
  padding: 7px 0 7px 5px;
  border-bottom: 1px solid #ddd;
`;

const SideIconButton = styled(IconButton)`
  float: right;
`;

const Loading = styled(CircularProgress)`
  text-align: center;
  width: 100%;
`;

const RoomComponent: React.FC = () => {
  const roomState = useSelector<State, RoomState>((state) => state.roomState);
  const teamState = useSelector<State, TeamState>((state) => state.teamState);
  const dispatch = useDispatch();

  useEffect(() => {
    getRooms(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getTeams(dispatch);
  }, [dispatch]);

  const [filter, setFilter] = useState<string>('');

  const onChangeFilter = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value);
  }, []);

  const roomsComponent = useMemo(() => {
    if (roomState.isLoading || teamState.isLoading) {
      return <Loading />;
    }
    return roomState.rooms
      .filter((x) => x.title.toLowerCase().includes(filter.toLowerCase()))
      .map((room) => (
        <ListItem key={room.id}>
          <SideIconButton size="small">
            <MoreHoriz />
          </SideIconButton>
          <Title>Team Name</Title>
          <div>{teamState.teams.find((t) => t.id === room.teamId)?.name ?? '-'}</div>
          <Title>Room Name</Title>
          <div>{room.title}</div>
          <Title>Type</Title>
          <div>{room.type}</div>
          <Title>Room ID</Title>
          <Mono>{room.id}</Mono>
        </ListItem>
      ));
  }, [roomState.isLoading, teamState.isLoading, filter]);

  return (
    <div>
      <input type="text" placeholder={'Search Room'} onChange={onChangeFilter} value={filter} />
      <List>{roomsComponent}</List>
    </div>
  );
};

export default RoomComponent;
