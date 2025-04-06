import { Event } from "@interfaces/events";

export default new Event({
  name: "interactionCreate",
  execute: (interaction, client) => {
    if (!client) return;

    if (
      !interaction.isModalSubmit() &&
      !interaction.isButton() &&
      !interaction.isStringSelectMenu()
    )
      return;

    if (interaction.isModalSubmit()) {
      client.modals.get(interaction.customId)?.(interaction);
    }

    if (interaction.isButton()) {
      client.buttons.get(interaction.customId)?.(interaction);
    }

    if (interaction.isStringSelectMenu()) {
      client.select.get(interaction.customId)?.(interaction);
    }
  },
});
