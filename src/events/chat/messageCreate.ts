import { Event } from "@interfaces/events";
import { listenFormationMessageService } from "@services/events/listenFormationMessage";

export default new Event({
  name: "messageCreate",
  execute: async (interaction) => {
    if (interaction.author?.bot) return;

    await listenFormationMessageService.listen(interaction);
  },
});
