import { fetch } from 'undici';
import { bold, green, red } from 'colorette';

/** @type {[string, number | undefined, string | undefined][]} */
const sites = [
	['https://top.gg'],
	['https://top.gg/api', 418 /* I'm a teapot */],
	['https://discordbotlist.com'],
	['https://bots.ondiscord.xyz'],
	['https://discords.com'],
	['https://discords.com/bots/api'],
	['https://bots.discordlabs.org'],
	['https://botlist.me'],
	['https://discord.bots.gg'],
	['https://discord.bots.gg/api/v1', undefined, 'GET'],
	['https://discordextremelist.xyz'],
	['https://api.discordextremelist.xyz/v2/health'],
	['https://blist.xyz'],
	['https://blist.xyz/api/v2'],
	['https://discordservices.net'],
	['https://api.discordservices.net'],
	['https://disforge.com'],
	['https://disforge.com/api'],
	['https://infinitybots.gg'],
	['https://api.infinitybots.gg'],
	['https://voidbots.net'],
	['https://discordlist.gg'],
	['https://api.discordlist.gg/developers']
];

/** @type {[Promise<import('undici').Response>, string, number][]} */
const responses = sites.map(([url, expectedStatusCode, method]) => {
	expectedStatusCode ??= 200;
	method ??= 'GET';

	return [fetch(url, { method }), url, expectedStatusCode];
});

let hasFailure = false;

for (let [response, url, expectedStatusCode] of responses) {
	response = await response;

	if (!response || expectedStatusCode !== response.status) {
		hasFailure = true;

		console.log(`${bold(url)} ${bold(red('failed.'))}`);
		continue;
	}

	console.log(`${bold(url)} ${bold(green('ok.'))}`);
}

if (hasFailure) process.exit(1);
else process.exit(0);
