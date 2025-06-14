import { CacheType, CommandInteraction } from "discord.js";
import { pingResponses } from "@constants/pingResponses";

class PingCommand {
  public async execute(
    interaction: CommandInteraction<CacheType>,
  ): Promise<undefined> {
    if (!interaction.isCommand()) return;

    const category = Object.keys(pingResponses) as Array<
      keyof typeof pingResponses
    >;
    const randomCategory =
      category[Math.floor(Math.random() * category.length)];

    if (!randomCategory) {
      await interaction.reply({
        content: "Estou fazendo um cafezinho, aguarde um momento!",
      });
      return;
    }

    const phrase = pingResponses[randomCategory];

    const randomResponse = phrase[Math.floor(Math.random() * phrase.length)];

    await interaction.reply({
      content: randomResponse,
    });
  }
}

export const pingCommand = new PingCommand();
