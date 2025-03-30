import { Command } from "@interfaces/commands";
import { ApplicationCommandType, MessageFlags } from "discord.js";

export default new Command({
  name: "ping-user",
  type: ApplicationCommandType.User,
  execute: async ({ interaction }) => {
    if (!interaction.isUserContextMenuCommand) return;

    await interaction.reply({
      content: "Pong!",
      flags: MessageFlags.Ephemeral,
    });
  },
});
