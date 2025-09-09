import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  private apiUrl = 'http://localhost:5233/api/tasks';

  constructor(private http: HttpClient) {}

  // GET /api/tasks
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // GET /api/tasks/id
  getTaskById(id?: string | number): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Task>(url);
  }

  // POST /api/tasks
  addTask(task: Task): Observable<Task> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<Task>(this.apiUrl, task, { headers });
  }

  // PATCH /api/tasks/id
  updateTask(data: Task, id?: string | number): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.patch<Task>(url, data, { headers });
  }

  // PATCH /api/tasks/id
  toggleTaskStatus(id?: string | number): Observable<Task> {
    const url = `${this.apiUrl}/status/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.patch<Task>(url, null, { headers });
  }

  // DELETE /api/tasks/id
  deleteTaskById(id?: string | number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  // DELETE /api/tasks
  deleteAllTasks(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }
}
