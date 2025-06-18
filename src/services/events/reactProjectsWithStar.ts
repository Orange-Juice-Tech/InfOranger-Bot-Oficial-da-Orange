import { Message, OmitPartialGroupDMChannel } from "discord.js";
/* import isDev from "@shared/utils/isDev"; */
import config from "@configs/channels";

class ReactProjectsWithStarService {
  public async listen(
    interaction: OmitPartialGroupDMChannel<Message<boolean>>,
  ) {
    const channel = interaction.channel.id;
    const {
      notification: { projectsDivulgation },
    } = config;

    if (channel !== projectsDivulgation) {
      return;
    }

    await interaction.react("⭐");
    return;
  }
}

export const reactProjectsWithStarService = new ReactProjectsWithStarService();
