import { ClientDiscord } from "./client";
import { EventsLoader } from "@loaders/eventsLoader";
import { CommandLoader } from "@loaders/commandsLoader";
import { JobsLoader } from "@loaders/jobsLoader";
import { logger } from "@logging/logger";

async function bootstrap() {
  try {
    const client = new ClientDiscord();

    const commandLoader = new CommandLoader(client);
    await commandLoader.registerCommands();

    const eventsLoader = new EventsLoader(client);
    await eventsLoader.registerEvents();

    const jobsLoader = new JobsLoader(client);
    await jobsLoader.registerJobs();

    await client.start();
  } catch (error) {
    logger.error({
      prefix: "bootstrap",
      message: `Erro ao iniciar o cliente: ${error}`,
    });
  }
}

process.on("uncaughtException", (error) => {
  logger.error({
    prefix: "uncaughtException",
    message: `Erro na aplicação: ${error}`,
  });
});

process.on("unhandledRejection", (reason) => {
  logger.error({
    prefix: "unhandled-rejection",
    message: `Erro na aplicação: ${reason}`,
  });
});

bootstrap();
