import { ClientDiscord } from "./client";
import { EventsLoader } from "@loaders/eventsLoader";

async function bootstrap() {
  try {
    const client = new ClientDiscord();
    const eventsLoader = new EventsLoader(client);
    await eventsLoader.registerEvents();

    await client.start();

    console.log("Client started successfully.");
  } catch (error) {
    console.error("Error starting the client:", error);
  }
}

bootstrap();
