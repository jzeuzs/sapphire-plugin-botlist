// MIT License
//
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import os from 'node:os';
import net from 'node:net';

class Locked extends Error {
	public constructor(port: number) {
		super(`${port} is locked`);
	}
}

const lockedPorts = {
	old: new Set(),
	young: new Set()
};

// On this interval, the old locked ports are discarded,
// the young locked ports are moved to old locked ports,
// and a new young set for locked ports are created.
const releaseOldLockedPortsIntervalMs = 1000 * 15;

// Lazily create interval on first use
let interval: NodeJS.Timer;

interface Options extends Omit<net.ListenOptions, 'port'> {
	readonly port?: number | Iterable<number>;
	readonly exclude?: Iterable<number>;
	readonly host?: string;
}

const getLocalHosts = () => {
	const interfaces = os.networkInterfaces();

	// Add undefined value for createServer function to use default host,
	// and default IPv4 host in case createServer defaults to IPv6.
	const results = new Set([undefined, '0.0.0.0']);

	for (const _interface of Object.values(interfaces)) {
		for (const config of _interface!) {
			results.add(config.address);
		}
	}

	return results;
};

const checkAvailablePort = (options: Options): Promise<number> =>
	new Promise((resolve, reject) => {
		const server = net.createServer();
		server.unref();
		server.on('error', reject);

		server.listen(options, () => {
			const { port } = server.address() as net.AddressInfo;
			server.close(() => {
				resolve(port);
			});
		});
	});

const getAvailablePort = async (options: Options, hosts: Set<string | undefined>): Promise<number> => {
	if (options.host || options.port === 0) {
		return checkAvailablePort(options);
	}

	for (const host of hosts) {
		try {
			await checkAvailablePort({ port: options.port, host }); // eslint-disable-line no-await-in-loop
		} catch (error: any) {
			if (!['EADDRNOTAVAIL', 'EINVAL'].includes(error.code)) {
				throw error;
			}
		}
	}

	return options.port as number;
};

const portCheckSequence = function* (ports: Iterable<number>) {
	if (ports) {
		yield* ports;
	}

	yield 0; // Fall back to 0 if anything else failed
};

export default async (options?: Options) => {
	let ports: Iterable<number> = [];

	if (options?.port) {
		ports = typeof options.port === 'number' ? [options.port] : options.port;
	}

	if (!interval) {
		interval = setInterval(() => {
			lockedPorts.old = lockedPorts.young;
			lockedPorts.young = new Set();
		}, releaseOldLockedPortsIntervalMs);

		interval.unref();
	}

	const hosts = getLocalHosts();

	for (const port of portCheckSequence(ports)) {
		try {
			let availablePort = await getAvailablePort({ ...options, port }, hosts);
			while (lockedPorts.old.has(availablePort) || lockedPorts.young.has(availablePort)) {
				if (port !== 0) {
					throw new Locked(port);
				}

				availablePort = await getAvailablePort({ ...options, port }, hosts);
			}

			lockedPorts.young.add(availablePort);

			return availablePort;
		} catch (error: any) {
			if (!['EADDRINUSE', 'EACCES'].includes(error.code) && !(error instanceof Locked)) {
				throw error;
			}
		}
	}

	throw new Error('No available ports found');
};
