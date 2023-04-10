import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type TodoDocument = HydratedDocument<Todo>;
@Schema()
export class Todo {
  @Prop({ required: true })
  task: string;
  @Prop({ required: true, default: Date.now })
  createdOn: Date;
  @Prop({ required: true })
  status: string;
  @Prop()
  scheduledFor: Date;
  @Prop()
  createdBy: number;
  @Prop()
  updatedBy: number;
}
export const TodoSchema = SchemaFactory.createForClass(Todo);
