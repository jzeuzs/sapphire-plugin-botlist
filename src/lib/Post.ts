import { container } from '@sapphire/framework';
import { fetch, FetchResultTypes, FetchMethods, QueryError, FetchMediaContentTypes } from '@sapphire/fetch';
import type { BotList } from '..';

/**
 * The handler to post stats to sites.
 * @since 1.0.0
 */
export class Post {
	private guilds = container.client.guilds.cache.size;
	private users = container.client.guilds.cache.reduce((acc, guild) => acc + (guild.memberCount ?? 0), 0);
	private shards = container.client.shard?.count ?? 1;

	public constructor(public readonly botList: BotList) {}

	public topGG() {
		return this.query(
			`https://top.gg/api/bots/${this.botList.clientId}/stats`,
			this.botList.keys.topGG!,
			JSON.stringify({ server_count: this.guilds, shard_count: this.shards }),
			'https://top.gg'
		);
	}

	public discordBotList() {
		return this.query(
			`https://discordbotlist.com/api/v1/bots/${this.botList.clientId}/stats`,
			`Bot ${this.botList.keys.discordBotList}`,
			JSON.stringify({ guilds: this.guilds, users: this.users }),
			'https://discordbotlist.com'
		);
	}

	public botsOnDiscord() {
		return this.query(
			`https://bots.ondiscord.xyz/bot-api/bots/${this.botList.clientId}/guilds`,
			this.botList.keys.botsOnDiscord!,
			JSON.stringify({ guildCount: this.guilds }),
			'https://bots.ondiscord.xyz'
		);
	}

	public discords() {
		return this.query(
			`https://discords.com/bots/api/bot/${this.botList.clientId}`,
			this.botList.keys.discords!,
			JSON.stringify({ server_count: this.guilds }),
			'https://discords.com'
		);
	}

	public discordLabs() {
		return this.query(
			`https://bots.discordlabs.org/v2/bot/${this.botList.clientId}/stats`,
			this.botList.keys.discordLabs!,
			JSON.stringify({ server_count: this.guilds, shard_count: this.shards }),
			'https://bots.discordlabs.org'
		);
	}

	public bladeListGG() {
		return this.query(
			`https://api.bladelist.gg/bots/${this.botList.clientId}`,
			`Token ${this.botList.keys.bladeListGG}`,
			JSON.stringify({ server_count: this.guilds, shard_count: this.shards }),
			'https://bladelist.gg'
		);
	}

	public botListMe() {
		return this.query(
			`https://api.botlist.me/api/v1/bots/${this.botList.clientId}/stats`,
			`Bot ${this.botList.keys.botListMe}`,
			JSON.stringify({ server_count: this.guilds, shard_count: this.shards }),
			'https://botlist.me'
		);
	}

	public discordListSpace() {
		return this.query(
			`https://api.discordlist.space/v2/bots/${this.botList.clientId}`,
			this.botList.keys.discordListSpace!,
			JSON.stringify({ serverCount: this.guilds }),
			'https://discordlist.space'
		);
	}

	public discordBotsGG() {
		return this.query(
			`https://discord.bots.gg/api/v1/bots/${this.botList.clientId}/stats`,
			this.botList.keys.discordBotsGG!,
			JSON.stringify({ guildCount: this.guilds, shardCount: this.shards }),
			'https://discord.bots.gg'
		);
	}

	public discordExtremeList() {
		return this.query(
			`https://api.discordextremelist.xyz/v2/bot/${this.botList.clientId}/stats`,
			this.botList.keys.discordExtremeList!,
			JSON.stringify({ guildCount: this.guilds, shardCount: this.shards }),
			'https://discordextremelist.xyz'
		);
	}

	public reloadStats() {
		this.guilds = container.client.guilds.cache.size;
		this.users = container.client.guilds.cache.reduce((acc, guild) => acc + (guild.memberCount ?? 0), 0);
		this.shards = container.client.shard?.count ?? 1;
	}

	private async query(url: string, authorizationKey: string, body: string, siteUrl: string) {
		try {
			const response = await fetch(
				url,
				{
					method: FetchMethods.Post,
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
			if (err instanceof QueryError) this.botList.emit('postStatsError', await err.response.clone().json());

			this.botList.emit('postStatsError', err);
		}
	}
}
