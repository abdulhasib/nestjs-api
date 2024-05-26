// /module/customer/name-change-log/entity/name-change-log.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { NameEntity } from '../../name/entity/name.entity';
import { UserEntity } from '../../../user/entity/user.entity';

@Entity({ name: 'customer_name_change_log' })
export class NameChangeLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_name_id: number;

  @Column()
  user_id: number;

  @Column({ type: 'jsonb' }) // Change data type to jsonb
  data: any;

  @Column({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToOne(() => NameEntity)
  @JoinColumn({ name: 'customer_name_id', referencedColumnName: 'id' })
  customer: NameEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
