import { Header } from "../components/layouts/Header";
import { TodoForm } from "../components/todos/TodoForm";
import { TodoList } from "../components/todos/TodoList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      <Header />
      
      <main className="max-w-3xl mx-auto pt-20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Task Manager
          </h1>
          <p className="mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Stay organized and never forget important tasks
          </p>
        </div>


        <div className="bg-white overflow-hidden shadow-md rounded-2xl mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Create New Task</h2>
          </div>
          <div className="px-6 py-5">
            <TodoForm />
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow-md rounded-2xl">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Your Tasks</h2>
          </div>
          <div className="px-6 py-5">
            <TodoList />
          </div>
        </div>
      </main>

    </div>
  );
}