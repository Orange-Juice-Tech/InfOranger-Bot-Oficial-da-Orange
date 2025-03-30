import { Command } from "@interfaces/commands";
import { params } from "./say.params";
import { ApplicationCommandType, MessageFlags } from "discord.js";

export default new Command({
  name: "say",
  description: "Diga-me alguma coisa",
  options: params,
  type: ApplicationCommandType.ChatInput,
  execute: async ({ interaction, options }) => {
    if (!interaction.isCommand()) return;

    const message = options.getString("message");

    await interaction.reply({
      content: `Você disse: ${message}`,
      flags: MessageFlags.Ephemeral,
    });
  },
});
