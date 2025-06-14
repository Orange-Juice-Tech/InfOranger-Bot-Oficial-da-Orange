import { Command } from "@interfaces/commands";
import { ApplicationCommandType, MessageFlags } from "discord.js";

export default new Command({
  name: "status",
  description: "status comando",
  type: ApplicationCommandType.ChatInput,
  execute: async ({ interaction }) => {
    if (!interaction.isCommand()) return;

    await interaction.reply({
      content: "Eu ainda funciono!",
      flags: MessageFlags.Ephemeral,
    });
  },
});
