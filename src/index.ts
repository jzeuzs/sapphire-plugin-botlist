import { BotList } from './lib/botlist';
import { Webhook } from './lib/webhook/webhook';

export * from './lib/post';
export { BotList, Webhook };

declare module 'discord.js' {
	export interface ClientOptions {
		botList?: BotList.Options;
	}
}
