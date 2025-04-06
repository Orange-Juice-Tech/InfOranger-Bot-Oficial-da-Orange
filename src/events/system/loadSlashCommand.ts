import { Event } from "@interfaces/events";
import { CommandInteractionOptionResolver } from "discord.js";

export default new Event({
  name: "interactionCreate",
  execute: (interaction, client) => {
    if (!interaction.isChatInputCommand()) return;
    if (!client) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    const options = interaction.options as CommandInteractionOptionResolver;

    command.execute({ client, interaction, options });
  },
});
