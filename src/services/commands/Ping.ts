import { CacheType, CommandInteraction } from "discord.js";

class PingCommand {
  public async execute(
    interaction: CommandInteraction<CacheType>,
  ): Promise<undefined> {
    if (!interaction.isCommand()) return;

    await interaction.reply({
      content: "Estou fazendo um cafezinho, aguarde...",
    });
  }
}

export const pingCommand = new PingCommand();
