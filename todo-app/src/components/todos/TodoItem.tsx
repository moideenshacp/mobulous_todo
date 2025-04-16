import { formatDate } from "@/utils/formateDate";
import { trpc } from "../../utils/trpc";
import { Button } from "../ui/Button";
import { TodoType } from "@/types/todo";

interface TodoItemProps {
  todo: TodoType;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const utils = trpc.useContext();

  const updateMutation = trpc.todo.update.useMutation({
    onSuccess: () => {
      utils.todo.list.invalidate();
    },
  });

  const deleteMutation = trpc.todo.delete.useMutation({
    onSuccess: () => {
      utils.todo.list.invalidate();
    },
  });

  const handleToggleComplete = () => {
    updateMutation.mutate({
      id: todo.id,
      isCompleted: !todo.isCompleted,
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate({
      id: todo.id,
    });
  };


  // Calculate dynamic styles
  const borderColor = todo.isCompleted ? "border-green-500" : "border-blue-500";
  const checkboxColor = todo.isCompleted
    ? "bg-green-500 border-green-500"
    : "bg-white border-gray-300";

  return (
    <div
      className={`flex items-center justify-between bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 mb-4 ${borderColor} border-l-4`}

    >
      <div className="flex items-start gap-4 flex-grow">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={handleToggleComplete}
            className={`appearance-none h-6 w-6 rounded-full ${checkboxColor} border-2 cursor-pointer transition-all duration-200`}
          />
          {todo.isCompleted && (
            <svg
              className="absolute h-4 w-4 text-white pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>

        <div className="flex-grow">
          <h3
            className={`text-lg font-medium transition-all duration-200 ${
              todo.isCompleted ? "line-through text-gray-400" : "text-gray-900"
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p
              className={`mt-1 text-sm transition-all duration-200 ${
                todo.isCompleted ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {todo.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <svg
              className="h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-xs text-gray-400">
            {formatDate(new Date(todo.createdAt))}
            </p>
          </div>
        </div>
      </div>

      <Button
        variant="danger"
        size="sm"
        onClick={handleDelete}
        isLoading={deleteMutation.isPending}
        className={`text-red-500 border border-red-200 flex items-center gap-1`}
      >
        {!deleteMutation.isPending && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {deleteMutation.isPending ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
};
