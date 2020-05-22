import axios from 'axios';

import { AttachmentAction, Message, Person, Room, RoomMembership, Team } from '../types/WebEx';

const api = axios.create({
  baseURL: process.env.REACT_APP_WEB_EX_API_URI,
  headers: {
    Authorization: 'Bearer ' + process.env.REACT_APP_BOT_TOKEN,
  },
});

export const deleteMessage = async (messageId: string): Promise<string> => {
  await api.delete(`/messages/${messageId}`);
  return messageId;
};

export const getRooms = async (teamId?: string): Promise<Room[]> => {
  let items: Room[];

  if (!teamId) {
    const res = await api.get<{ items: Room[] }>('/rooms');
    items = res.data.items;
    return items;
  }
  const res = await api.get<{ items: Room[] }>(`/rooms?teamId=${teamId}`);
  return res.data.items;
};

export const getTeams = async (): Promise<Team[]> => {
  const res = await api.get<{ items: Team[] }>('/teams');
  return res.data.items;
};

export const getMemberships = async (): Promise<RoomMembership[]> => {
  const res = await api.get<{ items: RoomMembership[] }>('/memberships');
  return res.data.items;
};

export const getPersonDetails = async (personId: string): Promise<Person> => {
  const res = await api.get<Person>(`/people/${personId}`);
  return res.data;
};

export const getAttachmentActions = async (id: string): Promise<AttachmentAction> => {
  const res = await api.get<AttachmentAction>(`/attachment/actions/${id}`);
  return res.data;
};

export const getRoomDetails = async (roomId: string): Promise<Room> => {
  const res = await api.get<Room>(`/rooms/${roomId}`);
  return res.data;
};

export const createMembership = async (
  roomId: string,
  personId: string,
): Promise<RoomMembership> => {
  const res = await api.post<RoomMembership>('/memberships', { roomId, personId });
  return res.data;
};

export const getMessages = async (roomId: string): Promise<Message[]> => {
  const res = await api.get<{ items: Message[] }>('/messages', {
    params: {
      roomId,
      mentionedPeople: 'me',
    },
  });
  return res.data.items;
};

export const postMessage = async (
  teamName: string,
  spaceName: string,
  message: string,
  attachments?: unknown,
): Promise<Message> => {
  const rooms = await getRooms();
  let targetSpace = rooms.find((t: { title: string }) => t.title === spaceName);
  if (!targetSpace) {
    const teams = await getTeams();
    const mfc = teams.find((team) => team.name === teamName);
    if (!mfc) {
      throw new Error('Team not found');
    }
    const availRooms = await getRooms(mfc.id);
    targetSpace = availRooms.find((room) => room.title === spaceName);
    await api.post<RoomMembership>('/memberships', {
      roomId: targetSpace?.id,
      personId: process.env.ID_MFC_BOT,
    });
  }
  const res = await api.post<Message>('/messages', {
    roomId: targetSpace?.id,
    markdown: message,
    attachments,
  });
  return res.data;
};

export const getMessageDetails = async (messageId: string): Promise<Message> => {
  const res = await api.get<Message>(`/messages/${messageId}`);
  return res.data;
};

export const postMessageToRoomId = async (
  roomId: string,
  message: string,
  attachments?: { contentType: string; content: unknown }[],
): Promise<Message> => {
  const res = await api.post<Message>('/messages', {
    roomId,
    markdown: message,
    attachments,
  });
  return res.data;
};

export const postMessageToPersonId = async (
  toPersonId: string,
  message: string,
  attachments?: unknown,
): Promise<Message> => {
  const res = await api.post<Message>('/messages', {
    toPersonId,
    markdown: message,
    attachments,
  });
  return res.data;
};
