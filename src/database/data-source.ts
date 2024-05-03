import { config } from 'dotenv';
import { Board } from 'src/routes/board/entities/board.entity';
import { User } from 'src/routes/user/entities/user.entity';

import { DataSource } from 'typeorm';

config({ path: `.env.${process.env.NODE_ENV}.local` });

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PW,
  database: 'postgres',
  entities: [User, Board],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default dataSource;
