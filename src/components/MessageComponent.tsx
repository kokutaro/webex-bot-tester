import { MenuItem, Select } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';

import { getMessages } from '../actions/MessageActions';
import { AppState } from '../states/AppState';
import { MessageState } from '../states/MessageState';
import { RoomState } from '../states/RoomState';
import { State } from '../states/State';
import { List, ListItem, Loading, Title } from './GlobalComponents';

const MessageComponent: React.FC = () => {
  const messageState = useSelector<State, MessageState>((state) => state.messageState);
  const appState = useSelector<State, AppState>((state) => state.appState);
  const roomState = useSelector<State, RoomState>((state) => state.roomState);
  const token = useSelector<State, string | undefined>(
    (state) => state.configState.config.userToken,
  );

  const dispatch = useDispatch();
  const [selectedRoom, setSelectedRoom] = useState(appState.selectedRoom);
  const [selectedRoomId, setSelectedRoomId] = useState(appState.selectedRoom?.id ?? '');

  useEffect(() => {
    if (selectedRoom && token) {
      getMessages(dispatch, token, selectedRoom.id);
    }
  }, [dispatch, selectedRoom]);

  const onSelectionChange = useCallback((e: React.ChangeEvent<{ value: unknown }>) => {
    const id = e.target.value as string;
    setSelectedRoomId(id);
    setSelectedRoom(roomState.rooms.find((room) => room.id === id));
  }, []);

  const messageComponent = useMemo(() => {
    if (messageState.isLoading) {
      return <Loading />;
    }
    return messageState.messages.map((message) => (
      <ListItem key={message.id}>
        <Title>Date</Title>
        <div>{ReactHtmlParser(message.created)}</div>
        <Title>Text</Title>
        <div>{message.html ? ReactHtmlParser(message.html) : message.text}</div>
      </ListItem>
    ));
  }, [messageState.isLoading]);

  return (
    <div>
      <Select value={selectedRoomId} onChange={onSelectionChange}>
        {roomState.rooms.map((room) => (
          <MenuItem key={room.id} value={room.id}>
            {room.title}
          </MenuItem>
        ))}
      </Select>
      <List>{messageComponent}</List>
    </div>
  );
};

export default MessageComponent;
