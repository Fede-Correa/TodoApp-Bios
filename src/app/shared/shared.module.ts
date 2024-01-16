import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [TaskItemComponent],
  imports: [CommonModule, IonicModule],
  exports: [TaskItemComponent],
})
export class SharedModule { }