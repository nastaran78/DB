import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany,ManyToMany, JoinTable, OneToOne } from 'typeorm';
import taskEntity from './task.entity';
import CategoryEntity from './category.entity';
import LabelEntity from './label.entity';

@Entity()
export default class ItemEntity extends BaseEntity 
{
    

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;
  @Column()
  categoryID : number
 


}

