module.exports = {
  apps : [{
    name: 'nest-server',
    script: 'Nest-server/dist/main.js',
    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
    }
  }]
};