import getEnv from "@shared/utils/getEnv";

export default {
  botName: getEnv("BOT_NAME", "InfOranger, A Estagiária"),
  guildId: getEnv("DISCORD_GUILD_ID", "847518545156112424"),
  guildName: getEnv("DISCORD_GUILD_NAME=", "Orange Juice"),
};
