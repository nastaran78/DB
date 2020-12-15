import { Injectable } from '@nestjs/common';
import BookEntity from '../db/book.entity';
import CreateLabelDto from './dto/create-label.dto';

import CreateTaskDto from './dto/create-task.dto';
import CreateItemDto from './dto/create-item.dto';
import CreateCategoryDto from './dto/create-category.dto';
import LabelEntity from '../db/label.entity';
import ItemEntity from '../db/item.entity';
import CategoryEntity from '../db/category.entity';
import TaskEntity from '../db/task.entity';
import UserEntity from '../db/user.entity';
import { createQueryBuilder, getConnection } from 'typeorm';
import GenreEntity from '../db/genre.entity';
import {TodoModule} from './todo.module';
import taskEntity from '../db/task.entity';

@Injectable()

export class TodoService {

  async insertLabel(labelDetails: CreateLabelDto): Promise<LabelEntity> {
    const { text } = labelDetails;
    const label = new LabelEntity();
    label.text = text;
    label.save();
    return label;
  }

  async insertCategory(categoryDetails: CreateCategoryDto): Promise<CategoryEntity> {
      const {type} = categoryDetails;
      const category = new CategoryEntity();
      category.type = type;
      category.save();
      return category;
  }
  async insertItem(itemDetails: CreateItemDto): Promise<ItemEntity> {
      const {name, categoryID} = itemDetails;
      let item = new ItemEntity();
      item.name = name;
      item.categoryID = categoryID;
      item.save();
      return item;
  }

  async insertTask(taskDetails: CreateTaskDto): Promise<TaskEntity> {
    const { categoryId , text , items, labels } = taskDetails;
    const task = new TaskEntity();
    task.text = text;
    task.categoryID = categoryId;
    task.items = [];
    task.labels = [];
    if(items == undefined){}
    else
    {
      for(let i=0; i< items.length; i++)
      {
          const item = await ItemEntity.findOne(items[i]);
          task.items.push(item)
      }
    }
    for(let j=0; j< labels.length; j++)
    {
        const label = await LabelEntity.findOne(labels[j]);
        task.labels.push(label)
    }
    await task.save();
    return task;
  }

  async getAllItems(): Promise<ItemEntity[] > {
    return ItemEntity.find();
  }

  async removeTask(id: Number) {

    console.log((await TaskEntity.findOne({where: {id: id}})).text);
    (await TaskEntity.remove((await TaskEntity.findOne({where: {id: id}}))))

  }


  async removeItem(id: Number) {

    console.log((await ItemEntity.findOne({where: {id: id}})).name);
    (await ItemEntity.remove((await ItemEntity.findOne({where: {id: id}}))))

  }


 
  async updateTask(id: Number, taskDetails : CreateTaskDto){
    const { categoryId , text , items, labels  } = taskDetails;

    var task: TaskEntity = await TaskEntity.findOne({where: {id: id}});
    var category: CategoryEntity = await CategoryEntity.findOne({where: {id: categoryId}});
    task.categoryID = categoryId;
    task.items = []
    task.labels = []
    for(let i=0; i< items.length; i++)
    {
        const item = await ItemEntity.findOne(items[i]);
        task.items.push(item)
    }

    for(let j=0; j< labels.length; j++)
    {
        const label = await LabelEntity.findOne(labels[j]);
        task.labels.push(label)
    }
    task.save();
    return task;

  }
}