//channels.ts
import getEnv from "@shared/utils/getEnv";

export default {
  notification: {
    projectsDivulgation: getEnv(
      "CHANNEL_NOTIFICATION_PROJECTS_DIVULGATION",
      "851864181967421461",
    ),
  },
};
