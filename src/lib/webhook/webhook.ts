import polka from 'polka';
import getPort from './get-port';
import { TypedEmitter } from 'tiny-typed-emitter';
import type { Request, Response } from 'express';
import type { ListenOptions } from 'node:net';

/**
 * The class that handles webhooks from botlists.
 * @since 1.4.0
 */
export class Webhook extends TypedEmitter<Webhook.Events> {
	private server?: polka.Polka;

	public constructor(protected options: Webhook.Options) {
		super();

		this.options.listenOptions ??= {};
	}

	public async connect() {
		this.options.listenOptions!.port ??= await getPort();

		const server = polka()
			.get('/topGG', (req, res) => this.topGG(req, res))
			.listen(this.options);

		this.server = server;

		return new Promise<void>((resolve, reject) => {
			const server_ = server?.server;

			function listening() {
				cleanup();
				resolve();
			}

			function error(error: Error) {
				cleanup();
				reject(error);
			}

			function close() {
				cleanup();
				reject(new Error('Closed unexpectedly.'));
			}

			function cleanup() {
				server_?.off('listening', listening);
				server_?.off('error', error);
				server_?.off('close', close);
			}

			server_?.on('listening', listening);
			server_?.on('error', error);
			server_?.on('close', close);
		});
	}

	public disconnect() {
		return new Promise<void>((resolve, reject) => {
			this.server?.server?.close((error) => (error ? resolve() : reject(error)));
		});
	}

	private topGG(_: Request, res: Response) {
		res.end();
	}
}

export namespace Webhook {
	export interface Events {
		error: (error: unknown) => void;
		topGG: () => void;
	}

	export interface Options {
		/**
		 * If webhooks are enabled.
		 * @since 1.4.0
		 */
		enabled?: boolean;

		listenOptions?: ListenOptions;
	}
}
