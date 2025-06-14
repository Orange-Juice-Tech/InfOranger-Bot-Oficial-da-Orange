// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "InfOranger",
      script: "yarn",
      args: "start",
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: "600M",
    },
  ],
};
