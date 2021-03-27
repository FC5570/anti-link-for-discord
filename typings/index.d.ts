import { Message } from 'discord.js';

class TypedEmitter<L> {
  static defaultMaxListeners: number;
  addListener<U extends keyof L>(event: U, listener: L[U]): this;
  prependListener<U extends keyof L>(event: U, listener: L[U]): this;
  prependOnceListener<U extends keyof L>(event: U, listener: L[U]): this;
  removeListener<U extends keyof L>(event: U, listener: L[U]): this;
  removeAllListeners(event?: keyof L): this;
  once<U extends keyof L>(event: U, listener: L[U]): this;
  on<U extends keyof L>(event: U, listener: L[U]): this;
  off<U extends keyof L>(event: U, listener: L[U]): this;
  emit<U extends keyof L>(event: U, ...args: Parameters<L[U]>): boolean;
  eventNames<U extends keyof L>(): U[];
  listenerCount(type: keyof L): number;
  listeners<U extends keyof L>(type: U): L[U][];
  rawListeners<U extends keyof L>(type: U): L[U][];
  getMaxListeners(): number;
  setMaxListeners(n: number): this;
}

interface AntiLinkEvents {
  'muteCountReached': (message: Message, id: string, warnCount: number) => void;
  'kickCountReached': (message: Message, id: string, warnCount: number) => void;
  'banCountReached': (message: Message, id: string, warnCount: number) => void;
}

interface AntiLinkOptions {
  warnMsg?: string;
  muteCount?: string | number;
  kickCount?: string | number;
  banCount?: string | number;
}

export default class AntiLink extends TypedEmitter<AntiLinkEvents> {
  public constructor(public options: AntiLinkOptions);
  public async handleInvites(message: Message): Promise<void>;
}