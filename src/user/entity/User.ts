import { IsEnum } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './UserRole';
import { Market } from '../../market/entity/Market';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @IsEnum(UserRole)
  @Column({ default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @OneToMany(() => Market, (market) => market.user, { eager: true })
  market: Market[];
}
