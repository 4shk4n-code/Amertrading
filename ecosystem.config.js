// PM2 Ecosystem file for process management
// Install PM2: npm install -g pm2
// Start: pm2 start ecosystem.config.js
// Save: pm2 save
// Setup startup: pm2 startup

module.exports = {
  apps: [
    {
      name: "amertrading-web",
      script: "npm",
      args: "start",
      cwd: "/var/www/amertrading-web", // Change to your project path
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000, // Change if using different port
      },
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      min_uptime: "10s",
      max_restarts: 10,
    },
  ],
};

