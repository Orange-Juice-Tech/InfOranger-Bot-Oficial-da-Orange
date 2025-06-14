import { ClientEvents } from "discord.js";
import { ClientDiscord } from "../client";
import path from "path";
import fs from "fs/promises";
import { Event } from "@interfaces/events";
import { logger } from "@logging/logger";
import chalk from "chalk";

export class EventsLoader {
  constructor(private readonly client: ClientDiscord) {}

  public async registerEvents(): Promise<void> {
    try {
      const events = await this.loadEvents();

      for (const event of events) {
        this.client.registerEvents(event.event);
      }

      logger.success({
        prefix: "discord-events",
        message: `Carregado com sucesso ${chalk.blueBright(events.length)} eventos.`,
      });
    } catch (error) {
      logger.error({
        prefix: "discord-events",
        message: `Erro ao carregar eventos: ${error}`,
      });
    }
  }

  private async loadEvents(): Promise<Array<Event<keyof ClientEvents>>> {
    const events: Array<Event<keyof ClientEvents>> = [];
    const eventsDir = path.join(__dirname, "..", "events");

    await this.readEventsRecursively(eventsDir, events);

    return events;
  }

  private async readEventsRecursively(
    dir: string,
    events: Array<Event<keyof ClientEvents>>,
  ): Promise<void> {
    const files = await fs.readdir(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        await this.readEventsRecursively(fullPath, events);
        continue;
      }

      if (!file.name.endsWith(".ts") && !file.name.endsWith(".js")) {
        continue;
      }

      try {
        const imported = await import(fullPath);
        const event: Event<keyof ClientEvents> = imported.default;

        if (event?.event?.name && typeof event.event.execute === "function") {
          events.push(event);
        }
      } catch (error) {
        logger.error({
          prefix: "discord-events",
          message: `Erro ao carregar o arquivo de evento ${fullPath}: ${error}`,
        });
      }
    }
  }
}
