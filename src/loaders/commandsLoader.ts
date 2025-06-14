import { promises as fs } from "fs";
import path from "path";
import { CommandType } from "@interfaces/commands";
import { ClientDiscord } from "../client";

export class CommandLoader {
  constructor(private clientDiscord: ClientDiscord) {}

  private async loadCommands(): Promise<CommandType[]> {
    const commands: CommandType[] = [];

    async function readCommandsRecursively(dir: string): Promise<void> {
      const files = await fs.readdir(dir, { withFileTypes: true });

      for (const file of files) {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
          /*  if (!isDev && file.name === "development") continue; */

          await readCommandsRecursively(fullPath);
        } else if (file.name.endsWith(".ts") || file.name.endsWith(".js")) {
          const command = await import(fullPath);

          if (command.default?.name && command.default?.execute) {
            commands.push(command.default);
          }
        }
      }
    }

    const commandsPath = path.join(__dirname, "..", "commands");
    await readCommandsRecursively(commandsPath);
    return commands;
  }

  public async registerCommands(): Promise<void> {
    try {
      const commands = await this.loadCommands();

      for (const command of commands) {
        this.clientDiscord.registerCommands(command);
      }

      console.log("Commands loaded successfully:");
    } catch (error) {
      console.error("Error loading commands:", error);
    }
  }
}
