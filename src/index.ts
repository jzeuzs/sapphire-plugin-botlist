import { BotList } from './lib/botlist';

export * from './lib/post';
export { BotList };

declare module 'discord.js' {
	export interface ClientOptions {
		botList?: BotList.Options;
	}
}
