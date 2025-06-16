import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { adminPermission } from "@shared/utils/AdminPermission";
import isDev from "@shared/utils/isDev";
import channelsToIgnore from "@shared/utils/channelsToIgnore";

class ListenFormationMessageService {
  public async listen(
    interaction: OmitPartialGroupDMChannel<Message<boolean>>,
  ) {
    const content = interaction.content.toLowerCase();
    const channel = interaction.channel;

    const channelId = channel.id;
    const skipList = [
      "1324428538551603202",
      "1235574139033620500",
      "977255683286245436",
      "1080235206486786138",
      "1355177989503189214",
      "1253081024251039804",
      "1202631135960764506",
      "1252701167872638986",
    ];

    const shouldIgnore = channelsToIgnore(channelId, skipList);

    if (shouldIgnore) return;

    if (!channel.isTextBased()) return;

    const testOne = /\bprograma\b/i;
    const textTwo = /\bforma[çc][aã]o\b/i;

    const isFormationMessage = testOne.test(content) && textTwo.test(content);

    if (!isFormationMessage) {
      return;
    }

    const isAdmin = await adminPermission.hasPermission(interaction);

    if (isAdmin) {
      if (isDev()) {
        console.log(
          `Mensagem do admin ${interaction.author.username} ignorada`,
        );
      }
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
