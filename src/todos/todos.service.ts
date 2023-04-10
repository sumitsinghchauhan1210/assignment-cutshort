import { Injectable } from '@nestjs/common';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './entities/todo.entity';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todosModel: Model<Todo>) {}
  create(createTodoDto: CreateTodoDto) {
    const todo = new Todo();
    todo.task = createTodoDto.task;
    if (createTodoDto.scheduledFor) {
      todo.scheduledFor = createTodoDto.scheduledFor;
    }
    todo.status = 'PENDING';
    return new this.todosModel(todo).save();
  }

  findAll() {
    return `This action returns all todos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
