import {
  ApplicationCommandOptionType,
  ChatInputApplicationCommandData,
} from "discord.js";

export const params: ChatInputApplicationCommandData["options"] = [
  {
    name: "message",
    description: "Mensagem a ser enviada",
    type: ApplicationCommandOptionType.String,
    required: true,
  },
];
