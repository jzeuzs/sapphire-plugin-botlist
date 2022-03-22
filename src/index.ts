import { BotList } from './lib/BotList';

export * from './lib/Post';
export { BotList };

declare module 'discord.js' {
	export interface ClientOptions {
		botList?: BotList.Options;
	}
}
