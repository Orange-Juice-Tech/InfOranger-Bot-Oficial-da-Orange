import {
  ApplicationCommandDataResolvable,
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
import { ButtonHandle } from "@interfaces/buttonHandle";

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
        GatewayIntentBits.GuildMessageReactions,
      ],
      partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
        Partials.User,
        Partials.Reaction,
      ],
    });
  }

  public async start() {
    await this.login(secrets.DISCORD_TOKEN);
    this.applyCommands();
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

  public async registerCommands(commands: CommandType) {
    const { name, buttons, selects, modals } = commands;

    if (name) {
      this.commands.set(name, commands);

      if (buttons) {
        buttons.forEach((execute, key) => this.buttons.set(key, execute));
      }

      if (selects) {
        selects.forEach((execute, key) => this.select.set(key, execute));
      }

      if (modals) {
        modals.forEach((execute, key) => this.modals.set(key, execute));
      }
    }
  }

  public async registerButtons(button: ButtonHandle) {
    const { name, execute } = button;

    if (name) {
      this.buttons.set(name, execute);
    }
  }

  public applyCommands() {
    const listOfCommands: Array<ApplicationCommandDataResolvable> =
      this.commands.map((command) => ({
        ...command,
      }));

    this.on("ready", async () => {
      await this.application?.commands.set(listOfCommands);

      console.log("Commands applied successfully!");
    });
  }
}
