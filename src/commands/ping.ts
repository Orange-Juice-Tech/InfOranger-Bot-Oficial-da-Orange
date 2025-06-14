import { Command } from "@interfaces/commands";
import { ApplicationCommandType } from "discord.js";
import { pingCommand } from "@services/commands/Ping";

export default new Command({
  name: "ping",
  description: "O comando mais clássico de todos!",
  type: ApplicationCommandType.ChatInput,
  execute: async ({ interaction }) => {
    await pingCommand.execute(interaction);
  },
});
