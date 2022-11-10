import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entity/User';
import { Product } from '../../product/entity/Product';

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

  @OneToMany(() => Product, (product) => product.market)
  product: Product[];
}
