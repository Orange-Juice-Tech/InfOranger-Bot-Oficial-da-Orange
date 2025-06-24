import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { adminPermission } from "@shared/utils/AdminPermission";
import isDev from "@shared/utils/isDev";
import channelsToIgnore from "@shared/utils/channelsToIgnore";

class ListenHackthonMessageService {
  public async listen(
    interaction: OmitPartialGroupDMChannel<Message<boolean>>,
  ) {
    const content = interaction.content.toLowerCase();
    const channel = interaction.channel;

    const channelId = channel.id;
    const skipList = [
      "1235574139033620500",
      "977255683286245436",
      "1080235206486786138",
      "1355177989503189214",
      "1253081024251039804",
      "1202631135960764506",
      "1252701167872638986",
      "1386782080066781295",
      "1386782099499122780",
      "1386782121611362394",
      "1386782146143719545",
      "1079768581287448578",
    ];

    const shouldIgnore = channelsToIgnore(channelId, skipList);

    if (shouldIgnore) return;

    if (!channel.isTextBased()) return;

    const hackthonRegex = /\bhackthon\b/i;

    const isValidMessage = hackthonRegex.test(content);

    if (!isValidMessage) {
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

    const messageToSend = `Olá ${interaction.author}! 👋 
Que bom que você tem interesse no hackthon! 🚀

O hackthon é para **todos os níveis de conhecimento**, **sem requisitos mínimos** ou **experiência**. As vagas ficam abertas até dia **10/07** e você pode ver mais informações no canal: https://discord.com/channels/847518545156112424/1386782080066781295

Vale muito a pena participar! 💪`;

    await channel.send({
      content: messageToSend,
      reply: {
        messageReference: interaction.id,
      },
    });
  }
}
export const listenHackthonMessageService = new ListenHackthonMessageService();
