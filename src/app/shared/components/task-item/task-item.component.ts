import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TasksService } from 'src/app/core/services/tasks.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent  implements OnInit {
  @Input('data') public task: any = {};
  @Output('edit') public editEmitter = new EventEmitter();

  constructor(private tasksService: TasksService) { }

  ngOnInit() {}

  public editTask(data: any) {
    this.editEmitter.emit(this.task);
  }

  public deleteTask(taskId:  string) {
		this.tasksService.delete(taskId);
	}

}
