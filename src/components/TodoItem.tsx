import React from 'react';
import { motion } from 'framer-motion';
import { Todo } from '../types';
import { Video, Trash2, Clock } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onStatusChange: (id: string, status: Todo['status']) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  planning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  recording: 'bg-blue-50 text-blue-700 border-blue-200',
  editing: 'bg-purple-50 text-purple-700 border-purple-200',
  uploading: 'bg-orange-50 text-orange-700 border-orange-200',
  published: 'bg-green-50 text-green-700 border-green-200',
};

const statusIcons = {
  planning: 'ring-yellow-500/30',
  recording: 'ring-blue-500/30',
  editing: 'ring-purple-500/30',
  uploading: 'ring-orange-500/30',
  published: 'ring-green-500/30',
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onStatusChange, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-6">
        <div className="flex items-start gap-6">
          <div className={`rounded-full p-3 ring-4 ${statusIcons[todo.status]} bg-white`}>
            <Video className="w-6 h-6 text-gray-700" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold text-gray-900 truncate">
                {todo.title}
              </h3>
              <div className="flex items-center gap-3">
                <select
                  value={todo.status}
                  onChange={(e) => onStatusChange(todo.id, e.target.value as Todo['status'])}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                >
                  <option value="planning">Planning</option>
                  <option value="recording">Recording</option>
                  <option value="editing">Editing</option>
                  <option value="uploading">Uploading</option>
                  <option value="published">Published</option>
                </select>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="mt-2 text-gray-600">{todo.description}</p>
            <div className="mt-4 flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm border ${statusColors[todo.status]}`}>
                {todo.status}
              </span>
              {todo.dueDate && (
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};