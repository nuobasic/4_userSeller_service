import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/User';

@Entity('market')
export class Market {
  @PrimaryGeneratedColumn()
  marketId: number;

  @Column()
  marketName: string;

  @Column()
  phone: string;

  @Column()
  country: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => User, (user) => user.market)
  user: User;
}
