# todo-app

A simple Angular application for managing tasks. Users can add, delete, update, and clear tasks using a form-based interface.

## Features
- Add Tasks: Create new tasks with a name and description.
- Delete Tasks: Remove individual tasks by their unique ID.
- Update Tasks: Toggle the completion status of tasks.
- Clear All Tasks: Remove all tasks at once.
- Reactive Forms: Utilizes Angular's ReactiveFormsModule for form handling.

## Prerequisites
- Node.js (v16 or higher)
- Angular CLI (v17 or higher)

## Installation
1. Clone the repository:
```bash
git clone <repository-url>
```
2. Navigate to the project directory:
```bash
cd task-manager-app
```
3. Install dependencies:
```bash
npm install
```

## Running the Application
1. Start the development server:
```bash
ng serve
```
2. Open your browser and navigate to ```http://localhost:4200```.

## Project Structure
```src/app/app.component.ts```: Main component logic for task management.
```src/app/app.html```: Template for rendering the task form and task list.
```src/app/app.css```: Styles for the application.    
```src/interfaces/task.ts```: TypeScript interface for the Task model.

## Usage
- Enter a task name and description in the form and click "Add Task" to create a new task.
- Toggle a task's completion status by clicking the appropriate button.
- Delete a task by clicking its delete button.
- Clear all tasks using the "Clear All Tasks" button.

## Dependencies
- Angular Core
- Angular Router
- Angular Reactive Forms

## License

This project is licensed under the MIT License.