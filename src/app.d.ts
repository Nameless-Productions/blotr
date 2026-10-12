// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: {
				id: number;
				robloxId: string;
				discordId: string;
				robloxUsername: string;
				discordUsername: string;
				role: 'USER' | 'MODERATOR' | 'ADMINISTRATOR' | 'OWNER';
			};
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
