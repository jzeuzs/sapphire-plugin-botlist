import { container } from '@sapphire/framework';
import { fetch, FetchResultTypes, FetchMethods, QueryError, FetchMediaContentTypes } from '@sapphire/fetch';
import type { BotList } from '..';

/**
 * The handler to post stats to sites.
 * @since 1.0.0
 */
export class Post {
	private readonly shards = container.client.shard?.count ?? 1;

	public constructor(public readonly botList: BotList) {}

	public async topGG() {
		return this.query(
			`https://top.gg/api/bots/${this.botList.clientId}/stats`,
			this.botList.keys.topGG!,
			JSON.stringify({ server_count: await this.botList.computeGuilds(), shard_count: this.shards }),
			'https://top.gg',
			FetchMethods.Post
		);
	}

	public async discordBotList() {
		return this.query(
			`https://discordbotlist.com/api/v1/bots/${this.botList.clientId}/stats`,
			`Bot ${this.botList.keys.discordBotList}`,
			JSON.stringify({ guilds: await this.botList.computeGuilds(), users: await this.botList.computeUsers() }),
			'https://discordbotlist.com',
			FetchMethods.Post
		);
	}

	public async botsOnDiscord() {
		return this.query(
			`https://bots.ondiscord.xyz/bot-api/bots/${this.botList.clientId}/guilds`,
			this.botList.keys.botsOnDiscord!,
			JSON.stringify({ guildCount: await this.botList.computeGuilds() }),
			'https://bots.ondiscord.xyz',
			FetchMethods.Post
		);
	}

	public async discords() {
		return this.query(
			`https://discords.com/bots/api/bot/${this.botList.clientId}`,
			this.botList.keys.discords!,
			JSON.stringify({ server_count: await this.botList.computeGuilds() }),
			'https://discords.com',
			FetchMethods.Post
		);
	}

	public async discordLabs() {
		return this.query(
			`https://bots.discordlabs.org/v2/bot/${this.botList.clientId}/stats`,
			this.botList.keys.discordLabs!,
			JSON.stringify({ server_count: await this.botList.computeGuilds(), shard_count: this.shards }),
			'https://bots.discordlabs.org',
			FetchMethods.Post
		);
	}

	public async bladeListGG() {
		return this.query(
			`https://api.bladelist.gg/bots/${this.botList.clientId}`,
			`Token ${this.botList.keys.bladeListGG}`,
			JSON.stringify({ server_count: await this.botList.computeGuilds(), shard_count: this.shards }),
			'https://bladelist.gg',
			FetchMethods.Post
		);
	}

	public async botListMe() {
		return this.query(
			`https://api.botlist.me/api/v1/bots/${this.botList.clientId}/stats`,
			`Bot ${this.botList.keys.botListMe}`,
			JSON.stringify({ server_count: await this.botList.computeGuilds(), shard_count: this.shards }),
			'https://botlist.me',
			FetchMethods.Post
		);
	}

	public async discordListSpace() {
		return this.query(
			`https://api.discordlist.space/v2/bots/${this.botList.clientId}`,
			this.botList.keys.discordListSpace!,
			JSON.stringify({ serverCount: await this.botList.computeGuilds() }),
			'https://discordlist.space',
			FetchMethods.Post
		);
	}

	public async discordBotsGG() {
		return this.query(
			`https://discord.bots.gg/api/v1/bots/${this.botList.clientId}/stats`,
			this.botList.keys.discordBotsGG!,
			JSON.stringify({ guildCount: await this.botList.computeGuilds(), shardCount: this.shards }),
			'https://discord.bots.gg',
			FetchMethods.Post
		);
	}

	public async discordExtremeList() {
		return this.query(
			`https://api.discordextremelist.xyz/v2/bot/${this.botList.clientId}/stats`,
			this.botList.keys.discordExtremeList!,
			JSON.stringify({ guildCount: await this.botList.computeGuilds(), shardCount: this.shards }),
			'https://discordextremelist.xyz',
			FetchMethods.Post
		);
	}

	public async blist() {
		return this.query(
			`https://blist.xyz/api/v2/bot/${this.botList.clientId}/stats`,
			this.botList.keys.blist!,
			JSON.stringify({ server_count: await this.botList.computeGuilds(), shard_count: this.shards }),
			'https://blist.xyz',
			FetchMethods.Patch
		);
	}

	public async discordServices() {
		return this.query(
			`https://api.discordservices.net/bot/${this.botList.clientId}/stats`,
			this.botList.keys.discordServices!,
			JSON.stringify({ servers: await this.botList.computeGuilds(), shards: this.shards }),
			'https://discordservices.net',
			FetchMethods.Post
		);
	}

	public async disforge() {
		return this.query(
			`https://disforge.com/api/botstats/${this.botList.clientId}`,
			this.botList.keys.disforge!,
			JSON.stringify({ servers: await this.botList.computeGuilds() }),
			'https://disforge.com',
			FetchMethods.Post
		);
	}

	public async fatesList() {
		return this.query(
			`https://api.fateslist.xyz/bots/${this.botList.clientId}/stats`,
			`Bot ${this.botList.keys.fatesList}`,
			JSON.stringify({
				guild_count: await this.botList.computeGuilds(),
				user_count: await this.botList.computeUsers(),
				shard_count: this.shards
			}),
			'https://fateslist.xyz',
			FetchMethods.Post
		);
	}

	public async infinityBots() {
		return this.query(
			'https://api.infinitybotlist.com/bots/stats',
			this.botList.keys.infinityBots!,
			JSON.stringify({ servers: await this.botList.computeGuilds(), shards: this.shards }),
			'https://infinitybots.gg',
			FetchMethods.Post
		);
	}

	public async voidBots() {
		return this.query(
			`https://api.voidbots.net/bot/stats/${this.botList.clientId}`,
			this.botList.keys.voidBots!,
			JSON.stringify({ server_count: await this.botList.computeGuilds(), shard_count: this.shards }),
			'https://voidbots.net',
			FetchMethods.Post
		);
	}

	private async query(url: string, authorizationKey: string, body: string, siteUrl: string, method: FetchMethods) {
		try {
			const response = await fetch(
				url,
				{
					method,
					headers: {
						'content-type': FetchMediaContentTypes.JSON,
						authorization: authorizationKey
					},
					body
				},
				FetchResultTypes.Result
			);

			this.botList.emit('postStatsSuccess', response);

			if (this.botList.options.debug) container.logger.debug(`[BotList-Plugin]: Posting to ${siteUrl} was successful.`);
		} catch (err) {
			if (err instanceof QueryError) {
				const error = err.response.clone();
				let errorMessage = await error.json().catch(() => null);
				if (!errorMessage) errorMessage = await error.text().catch(() => null);

				this.botList.emit('postStatsError', errorMessage ?? 'Unknow error');
			}

			this.botList.emit('postStatsError', err);
		}
	}
}
