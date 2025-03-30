import { ClientDiscord } from "./client";
import { EventsLoader } from "@loaders/eventsLoader";
import { CommandLoader } from "@loaders/commandsLoader";

async function bootstrap() {
  try {
    const client = new ClientDiscord();

    const eventsLoader = new EventsLoader(client);
    await eventsLoader.registerEvents();

    const commandLoader = new CommandLoader(client);
    await commandLoader.registerCommands();

    await client.start();

    console.log("Client started successfully.");
  } catch (error) {
    console.error("Error starting the client:", error);
  }
}

bootstrap();
