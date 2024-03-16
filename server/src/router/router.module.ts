import { Module } from '@nestjs/common';
import { RouterModule as Router } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth.module';
import { FeaturesModule } from 'src/features/features.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    Router.register([
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'users',
        children: [
          {
            path: 'account',
            module: UsersModule,
          },
        ],
      },
      {
        path: 'projects',
        module: ProjectsModule,
        children: [
          {
            path: ':projectId',
            children: [
              {
                path: 'features',
                module: FeaturesModule,
                children: [
                  {
                    path: ':featureId',
                    children: [
                      {
                        path: 'tasks',
                        module: TasksModule,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ]),
  ],
})
export class RouterModule {}
