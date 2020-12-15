import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import ItemEntity from './item.entity';
import CategoryEntity from './category.entity'
import LabelEntity from './label.entity';
@Entity()
export default class TaskEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryID : number

  @Column()
  text: string;

  @ManyToMany( type => ItemEntity)
  @JoinTable()
  items: ItemEntity[];

  @ManyToMany(type => LabelEntity)
  @JoinTable()
  labels: LabelEntity[];
  

}