import { Message, User } from "discord.js";

export interface AntiLinkOptions {
  warnMessage: string | ((message: Message) => void);
  muteCount: number;
  kickCount: number;
  banCount: number;
  deleteMessage?: boolean;
  ignoredUsers?: string[];
  ignoredChannels?: string[];
  ignoredRoles?: string[];
}

export interface AntiLinkEvents {
  muteCountReached: [message: Message, user: User];
  kickCountReached: [message: Message, user: User];
  banCountReached: [message: Message, user: User];
}

export class AntiLinkClient {
  public constructor(options: AntiLinkOptions);
  public handleMessages(message: Message): void;
  public on<K extends keyof AntiLinkEvents>(
    event: K,
    listener: (...args: AntiLinkEvents[K]) => void
  ): this;
}
