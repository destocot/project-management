import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { FeaturesModule } from './features/features.module';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import { RouterModule } from './router/router.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../public/'),
      exclude: ['/api/(.*)'],
      serveStaticOptions: { index: false },
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    FeaturesModule,
    TasksModule,
    DatabaseModule,
    RouterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
