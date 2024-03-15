import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Feature } from './feature.entity';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Feature, (feature) => feature.tasks)
  @JoinColumn({ name: 'feature_id' })
  feature: Feature;

  @Column()
  feature_id: string;

  @Column({ default: false })
  is_completed: boolean;

  constructor(task: Partial<Task>) {
    Object.assign(this, task);
  }
}
