import { Event } from "@interfaces/events";

export default new Event({
  name: "ready",
  execute: (app) => {
    if (!app.user) return;

    console.log(
      `Bot ${app.user.username} is ready!`,
      `\nID: ${app.user.id}`,
      `\nGuilds: ${app.guilds.cache.size}`,
      `\nUsers: ${app.users.cache.size}`,
    );
  },
});
