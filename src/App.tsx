import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube } from 'lucide-react';
import { Todo } from './types';
import { TodoItem } from './components/TodoItem';
import { AddTodoForm } from './components/AddTodoForm';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (newTodo: Omit<Todo, 'id'>) => {
    setTodos([
      ...todos,
      {
        ...newTodo,
        id: Math.random().toString(36).substr(2, 9),
      },
    ]);
  };

  const handleStatusChange = (id: string, status: Todo['status']) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, status } : todo
    ));
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <Youtube className="w-10 h-10 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            YouTube Video Planner
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Organize and track your video production workflow
          </p>
        </div>

        <AddTodoForm onAdd={handleAddTodo} />

        <AnimatePresence>
          {todos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Youtube className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">
                No video tasks yet. Start by adding a new task!
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;