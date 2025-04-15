export interface Todo {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'recording' | 'editing' | 'uploading' | 'published';
  thumbnailUrl?: string;
  dueDate?: Date;
}