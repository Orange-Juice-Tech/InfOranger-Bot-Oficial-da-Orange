import { ClientDiscord } from "./client";
import { EventsLoader } from "@loaders/eventsLoader";
import { CommandLoader } from "@loaders/commandsLoader";
import { JobsLoader } from "@loaders/jobsLoader";

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

    console.log("Client started successfully.");
  } catch (error) {
    console.error("Error starting the client:", error);
  }
}

bootstrap();
