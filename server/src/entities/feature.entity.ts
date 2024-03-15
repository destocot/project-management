import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { Task } from './task.entity';

export enum FeatureStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

@Entity({ name: 'features' })
export class Feature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @ManyToOne(() => Project, (project) => project.features)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column()
  project_id: string;

  @Column({ default: FeatureStatus.OPEN })
  status: FeatureStatus;

  @OneToMany(() => Task, (task) => task.feature, {
    cascade: true,
  })
  tasks: Array<Task>;

  constructor(feature: Partial<Feature>) {
    Object.assign(this, feature);
  }
}
