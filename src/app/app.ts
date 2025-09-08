import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from '../interfaces/task';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  taskForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  username: string = 'Felix';

  tasks: Task[] = [];

  addTask() {
    const uuid = crypto.randomUUID();

    const newTask: Task = {
      id: uuid,
      name: this.taskForm.value.name ?? '',
      description: this.taskForm.value.description ?? '',
      isCompleted: false,
    };

    this.tasks.push(newTask);
    this.taskForm.reset();
  }

  deleteTask(id: string | number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  clearTasks() {
    this.tasks = [];
  }

  updateTask(id: string | number) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.isCompleted = !task.isCompleted;
    }
  }
}
