import { Command } from "@interfaces/commands";
import { ApplicationCommandType } from "discord.js";

export default new Command({
  name: "ping",
  description: "Ping comando",
  type: ApplicationCommandType.ChatInput,
  execute: async ({ interaction }) => {
    if (!interaction.isCommand()) return;

    await interaction.reply({
      content: "Pong!",
      ephemeral: true,
    });
  },
});
