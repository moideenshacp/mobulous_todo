import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { trpc } from "../../utils/trpc";

export const TodoForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const utils = trpc.useContext();
  const mutation = trpc.todo.create.useMutation({
    onSuccess: () => {
      setTitle("");
      setDescription("");
      setError("");
      utils.todo.list.invalidate();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    mutation.mutate({
      title,
      description: description.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="group relative">
        <Input
          label="Task Title"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          error={error}
          className="pl-3 pr-3 py-3 border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all duration-200"
        />
      </div>

      <div className="group relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (Optional)
        </label>
        <textarea
          className="block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[80px] p-3 text-sm"
          placeholder="Add details about your task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
        isLoading={mutation.isPending}
      >
        {!mutation.isPending && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {mutation.isPending ? "Creating..." : "Add New Task"}
      </Button>
    </form>
  );
};
