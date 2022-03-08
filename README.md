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
-	Auto-detection of enabled sites

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
		autoPost: {
			enabled: true, // (Optional); by default it is enabled
			interval: 3_600_000, // (Optional); by default it is set to 1 hour
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
		autoPost: {
			enabled: true, // (Optional); by default it is enabled
			interval: 3_600_000, // (Optional); by default it is set to 1 hour
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
-	[Top.gg](https://top.gg) | `topGG`
-	[Discord Bot List](https://discordbotlist.com) | `discordBotList`
-	[Bots on Discord](https://bots.ondiscord.xyz) | `botsOnDiscord`
-	[Discords](https://discords.com) | `discords`
-	[Discord Labs](https://bots.discordlabs.org) | `discordLabs`
-	[BladeList](https://bladelist.gg) | `bladeListGG`
-	[BotList.me](https://botlist.me) | `botListMe`
-	[Discord List](https://discordlist.space) | `discordListSpace`
-	[Discord Bots](https://discord.bots.gg) | `discordBotsGG`
-	[Discord Extreme List](https://discordextremelist.xyz) | `discordExtremeList`

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://tomio.codes/"><img src="https://avatars.githubusercontent.com/u/75403863?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tomio</b></sub></a><br /><a href="https://github.com/devtomio/sapphire-plugin-botlist/commits?author=devtomio" title="Code">💻</a> <a href="https://github.com/devtomio/sapphire-plugin-botlist/commits?author=devtomio" title="Documentation">📖</a> <a href="#ideas-devtomio" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-devtomio" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#plugin-devtomio" title="Plugin/utility libraries">🔌</a> <a href="#maintenance-devtomio" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
