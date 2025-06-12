// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "InfOranger",
      script: "dist/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
    },
  ],
};
