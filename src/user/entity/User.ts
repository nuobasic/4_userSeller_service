import { IsEnum } from 'class-validator';
import { DateColumns } from '../../dateColumm/dateColumns';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './UserRole';

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

  @Column(() => DateColumns, { prefix: false })
  dateColums: DateColumns;
}
