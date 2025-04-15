import { TodoType } from "@/types/todo";
import { trpc } from "../../utils/trpc";
import { TodoItem } from "./TodoItem";
import { useState } from "react";
import { FilterButton } from "./FilterButton";

export const TodoList: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const { data: todos, isLoading, isError } = trpc.todo.list.useQuery();

  const filteredTodos = todos?.filter((todo:TodoType) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.isCompleted;
    if (filter === "completed") return todo.isCompleted;
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-6 my-6 flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p>Error loading tasks. Please try again later.</p>
      </div>
    );
  }

  const activeCount = todos?.filter((todo:TodoType) => !todo.isCompleted).length || 0;
  const completedCount = todos?.filter((todo:TodoType) => todo.isCompleted).length || 0;

  return (
    <div className="space-y-6">
      {todos && todos.length > 0 && (
        <div className="flex flex-wrap items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 sm:mb-0">
            <span>{activeCount} active</span>
            <span className="px-2">•</span>
            <span>{completedCount} completed</span>
          </div>

          <div className="flex items-center gap-2">
            <FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
            >
              All
            </FilterButton>
            <FilterButton
              active={filter === "active"}
              onClick={() => setFilter("active")}
            >
              Active
            </FilterButton>
            <FilterButton
              active={filter === "completed"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </FilterButton>
          </div>
        </div>
      )}

      {!filteredTodos || filteredTodos.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 my-4 text-center">
          <div className="flex flex-col items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <div>
              <p className="text-lg font-medium text-gray-500">
                No tasks found
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {filter === "all"
                  ? "Add a new task to get started!"
                  : filter === "active"
                  ? "No active tasks. Great job!"
                  : "No completed tasks yet."}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTodos.map((todo: TodoType) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};

