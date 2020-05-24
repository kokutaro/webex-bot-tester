import dotenv from 'dotenv';

dotenv.config();

import { AdaptiveCard } from './AdaptiveCard';

export interface Room {
  id: string;
  title: string;
  type: 'direct' | 'group';
  isLocked: boolean;
  teamId?: string;
  lastActivity: string;
  creatorId: string;
  created: string;
  ownerId: string;
}

export interface Message {
  id: string;
  parentId: string;
  roomId: string;
  roomType: 'direct' | 'group';
  toPersonId: string;
  toPersonEmail: string;
  text: string;
  markdown: string;
  html: string;
  files: string[];
  personId: string;
  personEmail: string;
  mentionedPeople: string[];
  mentionedGroups: string[];
  attachments: {
    contentType: string;
    content: AdaptiveCard;
  }[];
  created: string;
  updated: string;
}

export interface CommandPayload {
  args: string[];
  personId: string;
  id: string;
  roomId: string;
  testCode: string;
}

export interface AttachmentAction {
  id: string;
  personId: string;
  roomId: string;
  type: 'submit';
  messageId: string;
  inputs: { [x: string]: string };
  created: string;
}

export interface CardPayload {
  personId: string;
  messageId: string;
  id: string;
  roomId: string;
  inputs: {
    [x: string]: string;
  };
  [k: string]: unknown;
}

export interface Person {
  id: string;
  emails: string[];
  phoneNumbers: string[];
  displayName: string;
  nickName: string;
  firstName: string;
  lastName: string;
  avatar: string;
  orgId: string;
  created: string;
  lastActivity: string;
  status: WebExStatus;
  type: UserType;
  invitePending?: boolean;
  loginEnabled?: boolean;
}

export type WebExStatus =
  | 'active'
  | 'call'
  | 'DoNotDisturb'
  | 'inactive'
  | 'meeting'
  | 'OutOfOffice'
  | 'pending'
  | 'presenting'
  | 'unknown';

export type UserType = 'person' | 'bot' | 'appuser';

export interface RoomMembership {
  id: string;
  roomId: string;
  personId: string;
  personEmail: string;
  personDisplayName: string;
  personOrgId: string;
  isModerator: boolean;
  isMonitor: boolean;
  isRoomHidden: boolean;
  created: string;
}
export interface TeamMembership {
  id: string;
  teamId: string;
  personId: string;
  personEmail: string;
  personDisplayName: string;
  personOrgId: string;
  isModerator: boolean;
  created: string;
}

export interface Team {
  id: string;
  name: string;
  creatorId: string;
  created: string;
}

const webExScopes = [
  'spark:memberships_read',
  'spark:kms',
  'spark:people_read',
  'spark:rooms_read',
  'spark:messages_write',
  'spark:memberships_write',
  'spark:teams_write',
  'spark:team_memberships_write',
  'spark:teams_read',
  'spark:rooms_write',
  'spark:messages_read',
  'spark:team_memberships_read',
];

export const webExAuthPayload = {
  scope: webExScopes.join(' '),
  redirect_uri: 'file:///callback',
  response_type: 'code',
  client_id: process.env.WEB_EX_CLIENT_ID,
};

export interface WebExAuthResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
}
