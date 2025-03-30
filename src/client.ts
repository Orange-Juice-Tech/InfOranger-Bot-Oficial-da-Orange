import {
  Client,
  ClientEvents,
  Collection,
  GatewayIntentBits,
  Partials,
} from "discord.js";
import secrets from "@configs/secrets";
import {
  CommandType,
  ComponentsButton,
  ComponentsModal,
  ComponentsSelect,
} from "@interfaces/commands";
import { EventTypes } from "@interfaces/events";

export class ClientDiscord extends Client {
  public commands: Collection<string, CommandType> = new Collection();
  public buttons: ComponentsButton = new Collection();
  public select: ComponentsSelect = new Collection();
  public modals: ComponentsModal = new Collection();

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildInvites,
      ],
      partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
        Partials.User,
      ],
    });
  }

  public async start() {
    await this.login(secrets.DISCORD_TOKEN);
  }

  public async registerEvents<K extends keyof ClientEvents>(
    event: EventTypes<K>,
  ): Promise<void> {
    const { name, once, execute } = event;

    if (once) {
      this.once(name, async (...args: ClientEvents[K]) => {
        try {
          execute(...args, this);
        } catch (error) {
          console.error(`Error executing event ${name}:`, error);
        }
      });
    } else {
      this.on(name, async (...args: ClientEvents[K]) => {
        try {
          execute(...args, this);
        } catch (error) {
          console.error(`Error executing event ${name}:`, error);
        }
      });
    }
  }

  public async registerCommands() {}
}
