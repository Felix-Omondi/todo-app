import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from '../interfaces/task';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToDoService } from './services/to-do-service';

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
  isDeleting: { [key: string]: boolean } = {};
  isToggling: { [key: string]: boolean } = {};
  isUpdating: boolean = false;
  editingTaskId: string | null = null;

  constructor(private toDoService: ToDoService) {}

  ngOnInit(): void {
    this.toDoService.getAllTasks().subscribe((response) => {
      console.log('GET Response:', response);
      this.tasks = response;
    });
  }

  startUpdate(task: Task) {
    this.isUpdating = true;
    this.editingTaskId = typeof task.id === 'string' ? task.id : null;
    this.taskForm.patchValue({
      name: task.name,
      description: task.description,
    });
  }

  submitForm() {
    const taskData: Task = {
      name: this.taskForm.value.name ?? '',
      description: this.taskForm.value.description ?? '',
    };

    if (this.isUpdating && this.editingTaskId) {
      this.toDoService.updateTask(taskData, this.editingTaskId).subscribe({
        next: (response) => {
          console.log('PATCH Response:', response);
          this.tasks = this.tasks.map((task) =>
            task.id === this.editingTaskId ? { ...task, ...response } : task
          );
          this.taskForm.reset();
          this.isUpdating = false;
          this.editingTaskId = null;
        },
        error: (error) => {
          console.error('Update task failed:', error);
        },
      });
    } else {
      this.toDoService.addTask(taskData).subscribe({
        next: (response) => {
          console.log('POST Response:', response);
          this.tasks.push(response);
          this.taskForm.reset();
        },
        error: (error) => {
          console.error('Add task failed:', error);
        },
      });
    }
  }

  deleteTask(id?: string | number) {
    if (!id) {
      console.error('Task ID is required for deletion');
      return;
    }
    this.isDeleting[id] = true;
    this.toDoService.deleteTaskById(id).subscribe({
      next: () => {
        console.log('DELETE Response: Task deleted successfully');
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.isDeleting[id] = false;
      },
      error: (error) => {
        console.error('Delete task failed:', error);
        this.isDeleting[id] = false;
      },
    });
  }

  clearTasks() {
    this.toDoService.deleteAllTasks().subscribe({
      next: () => {
        console.log('DELETE ALL Response: All tasks deleted successfully');
        this.tasks = [];
      },
      error: (error) => {
        console.error('Delete all tasks failed:', error);
      },
    });
  }

  toggleTaskStatus(id?: string | number) {
    if (!id) {
      console.error('Task ID is required for status toggle');
      return;
    }
    this.isToggling[id] = true;
    this.toDoService.toggleTaskStatus(id).subscribe({
      next: (response) => {
        console.log('PATCH Status Response:', response);
        this.tasks = this.tasks.map((task) => (task.id === id ? { ...task, ...response } : task));
        this.isToggling[id] = false;
      },
      error: (error) => {
        console.error('Status toggle failed:', error);
        this.isToggling[id] = false;
      },
    });
  }

  formatDate(date?: string): string {
    if (!date || date === '0001-01-01T00:00:00') return 'Not updated';
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
}
