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
    console.error("Error starting the client:", error);
  }
}

process.on("uncaughtException", (error) => {
  logger.error({
    prefix: "uncaughtException",
    message: "Error on application: " + error,
  });
});

process.on("unhandledRejection", (reason) => {
  logger.error({
    prefix: "unhandled-rejection",
    message: "Error on application: " + reason,
  });
});

bootstrap();
