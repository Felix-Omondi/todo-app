export interface Task {
  id?: number | string ;
  name: string;
  description: string;
  isCompleted?: boolean;
  createdAt?:string;
  updatedAt?:string
}
