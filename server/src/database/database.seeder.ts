import 'dotenv/config';
import { ConfigService } from '@nestjs/config';
import { Faker } from '@faker-js/faker';
import { DataSource, DataSourceOptions, getMetadataArgsStorage } from 'typeorm';
import {
  Seeder,
  SeederOptions,
  SeederFactoryManager,
  runSeeders,
  setSeederFactory,
} from 'typeorm-extension';
import { Project } from '../entities/project.entity';
import { Feature, FeatureStatus } from '../entities/feature.entity';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { isEmail, minLength } from 'class-validator';
import { Task } from '../entities/task.entity';

const configService = new ConfigService();

const args = process.argv.slice(2);
console.log(args);
const emailFromCLI = args.find((arg) => arg.startsWith('email='));
const passwordFromCLI = args.find((arg) => arg.startsWith('password='));

if (!passwordFromCLI || !emailFromCLI) {
  console.error(
    'Error: Please provide a seed user email and password using the email=<FILL_ME> password=<FILL_ME> option.',
  );
  process.exit(1);
}

const SEED_USER_EMAIL = emailFromCLI.split('=')[1];
if (!isEmail(SEED_USER_EMAIL)) {
  console.error(
    'Error: Please provide a valid seed user email with the email=<FILL_ME> option.',
  );
  process.exit(1);
}

const SEED_USER_PASSWORD = passwordFromCLI.split('=')[1];
if (!minLength(SEED_USER_PASSWORD, 6)) {
  console.error(
    'Error: Please provide a seed user password with 6 or more characters using the --password=<FILL_ME> option.',
  );
  process.exit(1);
}

export const UsersFactory = setSeederFactory(User, async () => {
  const user = new User({});
  user.email = SEED_USER_EMAIL;
  user.password = await bcrypt.hash(SEED_USER_PASSWORD, 10);

  return user;
});

export const ProjectsFactory = setSeederFactory(Project, (faker: Faker) => {
  const project = new Project();
  project.title = faker.word.words({ count: { min: 2, max: 5 } });

  return project;
});

export const FeaturesFactory = setSeederFactory(Feature, (faker: Faker) => {
  const feature = new Feature({});
  feature.description = faker.lorem.words({ min: 4, max: 6 });
  feature.status = faker.helpers.enumValue(FeatureStatus);
  return feature;
});

export const TasksFactory = setSeederFactory(Task, (faker: Faker) => {
  const task = new Task({});
  task.content = faker.lorem.words({ min: 4, max: 6 });

  return task;
});

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const usersFactory = factoryManager.get(User);
    const user = await usersFactory.save();

    const projectsFactory = factoryManager.get(Project);
    const projects = await projectsFactory.saveMany(5, {
      owner_id: user.id,
    });

    const featuresFactory = factoryManager.get(Feature);
    const tasksFactory = factoryManager.get(Task);

    for (const project of projects) {
      const features = await featuresFactory.saveMany(4, {
        project_id: project.id,
      });
      for (const feature of features) {
        await tasksFactory.saveMany(3, {
          feature_id: feature.id,
        });
      }
    }
  }
}

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: configService.getOrThrow('DB_HOST'),
  port: configService.getOrThrow('DB_PORT'),
  username: configService.getOrThrow('DB_USERNAME'),
  password: configService.getOrThrow('DB_PASSWORD'),
  database: configService.getOrThrow('DB_NAME'),
  entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
  synchronize: configService.getOrThrow('DB_SYNCHRONIZE'),
  logging: true,
  seeds: [MainSeeder],
};

const dataSource = new DataSource(dataSourceOptions);

dataSource.initialize().then(async () => {
  console.log('SEEDING STARTED 🌱');
  await dataSource.synchronize(configService.getOrThrow('DB_SYNCHRONIZE'));
  await runSeeders(dataSource);
  console.log('SEEDING COMPLETE 🌱');
  console.log(
    `Login Information: email: ${SEED_USER_EMAIL}, password: ${SEED_USER_PASSWORD}`,
  );
  process.exit();
});
