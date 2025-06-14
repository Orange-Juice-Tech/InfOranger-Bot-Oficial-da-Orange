import { Event } from "@interfaces/events";
import { logger } from "@logging/index";
import chalk from "chalk";

export default new Event({
  name: "ready",
  execute: (app) => {
    if (!app.user) return;

    logger.info({
      prefix: "discord-startup",
      message: `${chalk.rgb(5, 221, 233)(`${app.user.username} ${chalk.green("is ready!")}`)} 
${chalk.white("-----------------------------------------------")}
${chalk.blue("ID:")} ${app.user.id}
${chalk.blue("Guilds:")} ${app.guilds.cache.size}
${chalk.blue("Users:")} ${app.users.cache.size}
${chalk.blue("Commands:")} ${app.application?.commands.cache.size}
${chalk.white("-----------------------------------------------")}
        `,
    });
  },
});
