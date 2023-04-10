import { ApiProperty } from '@nestjs/swagger';
import { TodoStatus } from '../entities/todoStatus.enum';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Todo to be created',
    minimum: 10,
    required: true,
  })
  task: string;
  @ApiProperty({
    description: 'Task to be created for date',
    required: false,
    type: Date,
  })
  scheduledFor?: Date;
  @ApiProperty({
    enum: ['Pending', 'Completed', 'Cancelled'],
    required: false,
    default: 'Pending',
  })
  status?: TodoStatus;
}
