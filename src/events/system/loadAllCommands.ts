import { Event } from "@interfaces/events";
import { CommandInteractionOptionResolver } from "discord.js";

export default new Event({
  name: "interactionCreate",
  execute: (interaction, client) => {
    if (!client) return;

    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    const options = interaction.options as CommandInteractionOptionResolver;

    if (interaction.isChatInputCommand()) {
      return command.execute({ client, interaction, options });
    }

    if (interaction.isUserContextMenuCommand()) {
      return command.execute({ client, interaction, options });
    }

    if (interaction.isMessageContextMenuCommand()) {
      return command.execute({ client, interaction, options });
    }
  },
});
