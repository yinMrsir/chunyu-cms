module.exports = {
  apps : [
    {
      name: 'nest-server',
      exec_mode: 'cluster',
      instances: 1,
      script: 'Nest-server/dist/main.js',
      env: {
        NODE_ENV: 'production',
        MYSQL_HOST: '',
        MYSQL_USERNAME: '',
        MYSQL_PASSWORD: '',
        MYSQL_DATABASE: '',
        REDIS_HOST: '',
        DEV_TOOLS: false,
        REGION: '',
        ACCESS_KEY_Id: '',
        ACCESS_KEY_SECRET: '',
        BUCKET: '',
        CNAME: false,
        ENDPOINT: ''
      }
    },
    {
      name: 'nuxt-web',
      exec_mode: 'cluster',
      instances: 1,
      script: 'Nuxt-web/.output/server/index.mjs'
    }
  ]
};
