import { Event } from "@interfaces/events";
import { listenFormationMessageService } from "@services/events/listenFormationMessage";
import { listenHackthonMessageService } from "@services/events/listenHackthonMessage";
import { reactProjectsWithStarService } from "@services/events/reactProjectsWithStar";

export default new Event({
  name: "messageCreate",
  execute: async (interaction) => {
    if (interaction.author?.bot) return;

    await reactProjectsWithStarService.listen(interaction);
    await listenFormationMessageService.listen(interaction);
    await listenHackthonMessageService.listen(interaction);
  },
});
