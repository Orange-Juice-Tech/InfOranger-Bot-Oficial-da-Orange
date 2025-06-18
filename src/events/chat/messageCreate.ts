import { Event } from "@interfaces/events";
import { listenFormationMessageService } from "@services/events/listenFormationMessage";
import { reactProjectsWithStarService } from "@services/events/reactProjectsWithStar";

export default new Event({
  name: "messageCreate",
  execute: async (interaction) => {
    if (interaction.author?.bot) return;

    await reactProjectsWithStarService.listen(interaction);
    await listenFormationMessageService.listen(interaction);
  },
});
