import { ClientDiscord } from "../client";

export interface jobInterface {
  client: ClientDiscord;
  cron: string;
  description: string;
  execute: () => Promise<void>;
}
