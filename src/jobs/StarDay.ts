import { jobInterface } from "@interfaces/jobs";
import { ClientDiscord } from "../client";
import { logger } from "@logging/logger";
import channels from "@configs/channels";
import general from "@configs/general";
import { starMessages } from "@constants/starMessages";
import isDev from "@shared/utils/isDev";

class StarDay implements jobInterface {
  client: ClientDiscord;
  cron: string;
  description: string;

  constructor(client: ClientDiscord) {
    this.client = client;
    this.cron = "0 9 * * 3";
    this.description = "Job para o dia da estrelinha";
  }

  async execute() {
    const now = new Date().toLocaleString("en-US", {
      timeZone: "America/Sao_Paulo",
    });
    const date = new Date(now);
    const dayOfMonth = date.getDate();
    const weekOfMonth = Math.ceil(dayOfMonth / 7);

    if (weekOfMonth !== 2 && weekOfMonth !== 3) {
      if (isDev()) {
        logger.info({
          prefix: "discord-job-developStarDay",
          message:
            "Não é a segunda ou terceira semana do mês. Job não será executado.",
        });
      }
      return;
    }

    const guild = this.client.guilds.cache.find(
      (guild) => guild.id === general.guildId,
    );

    if (!guild) {
      logger.error({
        prefix: "discord-job-developStarDay",
        message: "A guilda não foi encontrada",
      });
      return;
    }
    const channel = guild.channels.cache.find(
      (channel) => channel.id === channels.notification.projectsDivulgation,
    );

    if (!channel || !channel.isSendable()) {
      logger.error({
        prefix: "discord-job-developStarDay",
        message: "Canal não encontrado ou não é possível enviar mensagens",
      });
      return;
    }

    let message = "";

    if (weekOfMonth === 2) {
      message = starMessages.develop;
    } else if (weekOfMonth === 3) {
      message = starMessages.design;
    }

    try {
      await channel.send(message);

      logger.info({
        prefix: "discord-job-developStarDay",
        message: "Mensagem enviada com sucesso",
      });
    } catch (error) {
      logger.error({
        prefix: "discord-job-developStarDay",
        message: `Erro ao enviar mensagem: ${error}`,
      });
    }
  }
}

export default StarDay;
