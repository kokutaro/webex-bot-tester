import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRooms } from '../actions/RoomActions';
import { RoomState } from '../states/RoomState';
import { State } from '../states/State';
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

const RoomComponent: React.FC = () => {
  const roomState = useSelector<State, RoomState>((state) => state.roomState);
  const dispatch = useDispatch();

  useEffect(() => {
    getRooms(dispatch);
  }, [dispatch]);

  const [filter, setFilter] = useState<string>('');

  const onChangeFilter = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value);
  }, []);

  const roomsComponent = useMemo(() => {
    if (roomState.isLoading) {
      return <p>Loading ...</p>;
    }
    return roomState.rooms
      .filter((x) => x.title.toLowerCase().includes(filter.toLowerCase()))
      .map((room) => (
        <ListItem key={room.id}>
          <Title>Room Name</Title>
          <div>{room.title}</div>
          <Title>Type</Title>
          <div>{room.type}</div>
          <Title>Room ID</Title>
          <Mono>{room.id}</Mono>
          <Title>Team ID</Title>
          <Mono>{room.teamId}</Mono>
        </ListItem>
      ));
  }, [roomState, filter]);

  return (
    <div>
      <input type="text" placeholder={'Search Room'} onChange={onChangeFilter} value={filter} />
      <List>{roomsComponent}</List>
    </div>
  );
};

export default RoomComponent;
