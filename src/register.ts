import { Plugin, container, postLogin, preGenericsInitialization, SapphireClient } from '@sapphire/framework';
import { BotList, Webhook } from '.';

export class BotListPlugin extends Plugin {
	public static [preGenericsInitialization](this: SapphireClient) {
		container.botList = new BotList(this.options.botList ?? { keys: {}, webhook: {} });
	}

	public static async [postLogin](this: SapphireClient) {
		if (this.options.botList?.autoPost?.enabled ?? true) {
			container.logger.info('[BotList-Plugin]: Auto-posting has been enabled.');

			setInterval(() => container.botList.postStats(), this.options.botList?.autoPost?.interval ?? 3.6e6);

			if (this.options.botList?.webhook?.enabled) {
				container.botList.webhook = new Webhook(this.options.botList.webhook);
				container.logger.info('[BotList-Plugin]: Webhook has been enabled.');

				await container.botList.webhook?.connect();
			}
		}
	}
}

SapphireClient.plugins.registerPreGenericsInitializationHook(BotListPlugin[preGenericsInitialization], 'BotList-PreGenericsInitialization');
SapphireClient.plugins.registerPostLoginHook(BotListPlugin[postLogin], 'BotList-PostLogin');

declare module '@sapphire/pieces' {
	interface Container {
		botList: BotList;
	}
}
