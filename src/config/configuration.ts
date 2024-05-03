export default () => ({
  ENVIRONMENT: process.env.ENVIRONMENT,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_pw: process.env.DB_PW,
  JWT_KEY: process.env.JWT_KEY,
});
