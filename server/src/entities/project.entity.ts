import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Feature } from './feature.entity';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @OneToMany(() => Feature, (feature) => feature.project, {
    cascade: true,
  })
  features: Array<Feature>;

  @Column()
  owner_id: string;

  constructor(project?: Partial<Project>) {
    Object.assign(this, project);
  }
}
