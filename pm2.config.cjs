module.exports = {
  apps : [
    {
      name: 'nest-server',
      exec_mode: 'cluster',
      instances: 1,
      script: 'Nest-server/dist/main.js',
    },
    {
      name: 'nuxt-web',
      exec_mode: 'cluster',
      instances: 1,
      script: 'Nuxt-web/.output/server/index.mjs'
    }
  ]
};