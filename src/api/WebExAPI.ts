import axios, { AxiosInstance } from 'axios';

import { Message, Room, RoomMembership, Team } from '../types/WebEx';

export class WebExApi {
  private api: AxiosInstance;

  constructor(token: string) {
    this.api = axios.create({
      baseURL: process.env.WEB_EX_API_URI,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  public deleteMessage = async (messageId: string): Promise<string> => {
    await this.api.delete(`/messages/${messageId}`);
    return messageId;
  };

  public getRooms = async (teamId?: string): Promise<Room[]> => {
    let items: Room[];

    if (!teamId) {
      const res = await this.api.get<{ items: Room[] }>('/rooms');
      items = res.data.items;
      return items;
    }
    const res = await this.api.get<{ items: Room[] }>(`/rooms?teamId=${teamId}`);
    return res.data.items;
  };

  public getTeams = async (): Promise<Team[]> => {
    const res = await this.api.get<{ items: Team[] }>('/teams');
    return res.data.items;
  };

  public getMemberships = async (): Promise<RoomMembership[]> => {
    const res = await this.api.get<{ items: RoomMembership[] }>('/memberships');
    return res.data.items;
  };

  public getMessages = async (roomId: string): Promise<Message[]> => {
    const res = await this.api.get<{ items: Message[] }>('/messages', {
      params: {
        roomId,
      },
    });
    return res.data.items;
  };

  public postMessage = async (
    teamName: string,
    spaceName: string,
    message: string,
    attachments?: unknown,
  ): Promise<Message> => {
    const rooms = await this.getRooms();
    let targetSpace = rooms.find((t: { title: string }) => t.title === spaceName);
    if (!targetSpace) {
      const teams = await this.getTeams();
      const mfc = teams.find((team) => team.name === teamName);
      if (!mfc) {
        throw new Error('Team not found');
      }
      const availRooms = await this.getRooms(mfc.id);
      targetSpace = availRooms.find((room) => room.title === spaceName);
      await this.api.post<RoomMembership>('/memberships', {
        roomId: targetSpace?.id,
        personId: process.env.ID_MFC_BOT,
      });
    }
    const res = await this.api.post<Message>('/messages', {
      roomId: targetSpace?.id,
      markdown: message,
      attachments,
    });
    return res.data;
  };

  public getMessageDetails = async (messageId: string): Promise<Message> => {
    const res = await this.api.get<Message>(`/messages/${messageId}`);
    return res.data;
  };

  public postMessageToRoomId = async (
    roomId: string,
    message: string,
    attachments?: { contentType: string; content: unknown }[],
  ): Promise<Message> => {
    const res = await this.api.post<Message>('/messages', {
      roomId,
      markdown: message,
      attachments,
    });
    return res.data;
  };

  public postMessageToPersonId = async (
    toPersonId: string,
    message: string,
    attachments?: unknown,
  ): Promise<Message> => {
    const res = await this.api.post<Message>('/messages', {
      toPersonId,
      markdown: message,
      attachments,
    });
    return res.data;
  };
}

export default WebExApi;
