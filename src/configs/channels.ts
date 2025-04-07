//channels.ts
import getEnv from "@shared/utils/getEnv";

export default {
  announcements: {
    geral: getEnv("DISCORD_CHANNEL_ANNOUNCEMENTS_GERAL", "851863909056774154"),
  },
};
