import { Message, OmitPartialGroupDMChannel } from "discord.js";

class ListenFormationMessageService {
  public async listen(
    interaction: OmitPartialGroupDMChannel<Message<boolean>>,
  ) {
    const content = interaction.content.toLowerCase();
    const channel = interaction.channel;

    if (!channel.isTextBased()) return;

    const testOne = /\bprograma\b/i;
    const textTwo = /\bforma[çc][aã]o\b/i;

    const isFormationMessage = testOne.test(content) && textTwo.test(content);

    if (!isFormationMessage) {
      return;
    }

    await interaction.react("✅");

    const formationMessage = `Olá, ${interaction.author}! 👋\nPara saber mais sobre o programa de formação, acesse: \n<https://orangejuice.com.br/programa-de-formacao/>`;

    await channel.send({
      content: formationMessage,
      reply: {
        messageReference: interaction.id,
      },
    });
  }
}
export const listenFormationMessageService =
  new ListenFormationMessageService();
