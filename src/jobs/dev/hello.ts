import { jobInterface } from "@interfaces/jobs";
import { ClientDiscord } from "../../client";
import channels from "@configs/channels";
import general from "@configs/general";

class HelloJob implements jobInterface {
  client: ClientDiscord;
  cron: string;
  description: string;

  constructor(client: ClientDiscord) {
    this.client = client;
    this.cron = "*/30 * * * *";
    this.description = "Hello Job";
  }

  async execute() {
    const guild = this.client.guilds.cache.find(
      (guild) => guild.id === general.guildId,
    );

    if (!guild) {
      console.error("Guild not found");
      return;
    }
    const channel = guild.channels.cache.find(
      (channel) => channel.id === channels.notification.projectsDivulgation,
    );

    if (!channel || !channel.isSendable()) {
      console.error("Channel not found or not sendable");
      return;
    }

    try {
      await channel.send("Hello, world!");
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
}

export default HelloJob;
