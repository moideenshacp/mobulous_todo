export interface TodoType {
    id: string;
    title: string;
    description: string | null;
    isCompleted: boolean;
    createdAt:  Date | string; 
    updatedAt: string;
    userId: string;
}
  