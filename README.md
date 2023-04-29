<div align="center">

# @devtomio/plugin-botlist

**Plugin for <a href="https://github.com/sapphiredev/framework">@sapphire/framework</a> to post stats to several discord bot lists.**

[![GitHub](https://img.shields.io/github/license/devtomio/sapphire-plugin-botlist)](https://github.com/devtomio/sapphire-plugin-botlist/blob/main/LICENSE.md)
[![npm](https://img.shields.io/npm/v/@devtomio/plugin-botlist?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@devtomio/plugin-botlist)

</div>

## Description

This plugin enables the integration of many bot lists such as Top.gg, Discord Labs, and others.

## Features

-   Fully ready for TypeScript!
-   Includes ESM ready entrypoint
-   Easy to use
-   Auto-detection of enabled sites

## Installation

`@devtomio/plugin-botlist` depends on the following packages. Be sure to install these along with this package!

-   [`@sapphire/framework`](https://www.npmjs.com/package/@sapphire/framework)

You can use the following command to install this package, or replace `npm install` with your package manager of choice.

```sh
npm install @devtomio/plugin-botlist @sapphire/framework discord.js
```

---

## Usage

### JavaScript

In your main or setup file, register the plugin:

```javascript
require('@devtomio/plugin-botlist/register');
```

```javascript
require('@devtomio/plugin-botlist/register');

const client = new SapphireClient({
	/* your bot options */
	botList: {
		clientId: 'YOUR_CLIENT_ID', // Optional; by default it is the bot's id
		debug: false, // (Optional), shows debug messages; by default it is false
		shard: false, // (Optional), enable sharding support; by default it is false
		autoPost: {
			enabled: true, // (Optional); by default it is enabled
			interval: 3_600_000 // (Optional); by default it is set to 1 hour
		},
		keys: {
			topGG: 'YOUR_AWESOME_TOP_GG_API_KEY' // Your top.gg API key (a list will be found below)
		}
	}
});

async function main() {
	await client.login();
}

void main();
```

### TypeScript

In your main or setup file, register the plugin:

```typescript
import '@devtomio/plugin-botlist/register';
```

```typescript
import '@devtomio/plugin-botlist/register';

const client = new SapphireClient({
	/* your bot options */
	botList: {
		clientId: 'YOUR_CLIENT_ID', // Optional; by default it is the bot's id
		debug: false, // (Optional), shows debug messages; by default it is false
		shard: false, // (Optional), enable sharding support; by default it is false
		autoPost: {
			enabled: true, // (Optional); by default it is enabled
			interval: 3_600_000 // (Optional); by default it is set to 1 hour
		},
		keys: {
			topGG: 'YOUR_AWESOME_TOP_GG_API_KEY' // Your top.gg API key (a list will be found below)
		}
	}
});

async function main() {
	await client.login();
}

void main();
```

If you enable the `autoPost` option, the plugin will automatically publish the data for you; you don't need to do anything else!

## List of Supported Sites

-   [Top.gg](https://top.gg) | `topGG`
-   [Discord Bot List](https://discordbotlist.com) | `discordBotList`
-   [Bots on Discord](https://bots.ondiscord.xyz) | `botsOnDiscord`
-   [Discords](https://discords.com) | `discords`
-   [BotList.me](https://botlist.me) | `botListMe`
-   [Discord Bots](https://discord.bots.gg) | `discordBotsGG`
-   [Discord Extreme List](https://discordextremelist.xyz) | `discordExtremeList`
-   [Blist](https://blist.xyz) | `blist`
-   [Discord Services](https://discordservices.net) | `discordServices`
-   [Disforge](https://disforge.com) | `disforge`
-   [Infinity Bot List](https://infinitybots.gg) | `infinityBots`
-   [Void Bots](https://voidbots.net) | `voidBots`
-   [Discord List](https://discordlist.gg) | `discordListGG`

## Contributors

Thank you to all the people who already contributed to this project!

<a href="https://github.com/devtomio/sapphire-plugin-botlist/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=devtomio/sapphire-plugin-botlist" />
</a>
