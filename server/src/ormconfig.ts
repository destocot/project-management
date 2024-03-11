import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

const ormconfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'callie-todo-list',
  entities: [User],
  synchronize: true,
} satisfies TypeOrmModuleOptions;

export default ormconfig;
