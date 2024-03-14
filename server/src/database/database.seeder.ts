import 'dotenv/config';
import { ConfigService } from '@nestjs/config';
import { Faker, faker } from '@faker-js/faker';
import { DataSource, DataSourceOptions, getMetadataArgsStorage } from 'typeorm';
import {
  Seeder,
  SeederOptions,
  SeederFactoryManager,
  runSeeders,
  setSeederFactory,
} from 'typeorm-extension';
import { Project } from '../entities/project.entity';

const configService = new ConfigService();
const PROJECT_OWNER_ID = 'ef7598c7-47ff-41ab-b8de-56d2a899e718';

export const ProjectsFactory = setSeederFactory(Project, (faker: Faker) => {
  const project = new Project();
  project.owner_id = PROJECT_OWNER_ID;
  project.title = faker.word.words({ count: { min: 2, max: 5 } });

  return project;
});

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const projectsFactory = factoryManager.get(Project);
    // const projectsRepository = dataSource.getRepository(Project);
    // await projectsRepository.insert({
    //   title: faker.word.words({ count: { min: 2, max: 5 } }),
    //   owner_id: PROJECT_OWNER_ID,
    // });
    await projectsFactory.saveMany(9);
  }
}

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: configService.getOrThrow('DB_HOST'),
  port: configService.getOrThrow('DB_PORT'),
  username: configService.getOrThrow('DB_USERNAME'),
  password: configService.getOrThrow('DB_PASSWORD'),
  database: configService.getOrThrow('DB_NAME'),
  //   entities: [join(__dirname + 'dist/**/*.entity{.ts,.js}')],
  entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
  //   synchronize: configService.getOrThrow('DB_SYNCHRONIZE'),
  logging: true,
  seeds: [MainSeeder],
};

const dataSource = new DataSource(dataSourceOptions);

dataSource.initialize().then(async () => {
  //   await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
