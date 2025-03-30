import { Command } from "@interfaces/commands";
import { ApplicationCommandType } from "discord.js";
import { params } from "./say.params";

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
      ephemeral: true,
    });
  },
});
