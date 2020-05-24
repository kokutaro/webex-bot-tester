import { Menu, MenuItem, TextField } from '@material-ui/core';
import { FileCopy, MoreHoriz, OpenInNew } from '@material-ui/icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentViewAction } from '../actions/AppActions';
import { getRooms } from '../actions/RoomActions';
import { getTeams } from '../actions/TeamActions';
import { RoomState } from '../states/RoomState';
import { State } from '../states/State';
import { TeamState } from '../states/TeamState';
import { Room } from '../types/WebEx';
import { List, ListItem, Loading, Mono, SideIconButton, Title } from './GlobalComponents';

const RoomComponent: React.FC = () => {
  const roomState = useSelector<State, RoomState>((state) => state.roomState);
  const teamState = useSelector<State, TeamState>((state) => state.teamState);
  const token = useSelector<State, string | undefined>(
    (state) => state.configState.config.botToken,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      getRooms(dispatch, token);
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      getTeams(dispatch, token);
    }
  }, [dispatch]);

  const [filter, setFilter] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<Room>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, room: Room) => {
    setAnchorEl(e.currentTarget);
    setSelectedRoom(room);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnShowMessagesMenuClick = () => {
    if (selectedRoom) {
      dispatch(
        setCurrentViewAction({
          currentView: 'messages',
          selectedRoom,
        }),
      );
    }
  };

  const onChangeFilter = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(e.currentTarget.value);
    },
    [filter],
  );

  const roomsComponent = useMemo(() => {
    if (roomState.isLoading || teamState.isLoading) {
      return <Loading />;
    }
    return roomState.rooms
      .filter((x) => x.title.toLowerCase().includes(filter.toLowerCase()))
      .map((room) => (
        <ListItem key={room.id}>
          <SideIconButton size="small" onClick={(e) => handleClick(e, room)}>
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
      <TextField type="text" label={'Search Room'} onChange={onChangeFilter} value={filter} />
      <List>{roomsComponent}</List>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleOnShowMessagesMenuClick}>
          <OpenInNew />
          Show messages
        </MenuItem>
        <MenuItem>
          <FileCopy />
          Copy room ID
        </MenuItem>
      </Menu>
    </div>
  );
};

export default RoomComponent;
