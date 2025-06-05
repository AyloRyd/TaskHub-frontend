import { createRoute } from "@tanstack/react-router";
import type { AnyRoute } from "@tanstack/react-router";
import { LoaderCircle, User, Mail, Shield, CheckCircle, XCircle, MoreVertical, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/auth";
import { useTasks } from "@/hooks/use-tasks";
import type { Task } from "@/lib/types/tasks";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function TaskCard({ task }: { task: Task }) {
  const getVisibilityColor = (visibility: Task['visibility']) => {
    switch (visibility) {
      case 'Public':
        return 'bg-green-200 text-green-800 border-green-200';
      case 'Private':
        return 'bg-blue-200 text-blue-800 border-blue-200';
      case 'Paid':
        return 'bg-yellow-200 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-200 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-taskhub-light border border-taskhub-middle rounded-lg p-4 cursor-pointer transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-3">
          <h3 className="text-lg font-semibold text-font-primarly truncate mb-2">
            {task.name}
          </h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getVisibilityColor(task.visibility)}`}>
            {task.visibility}
          </span>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              size="sm" 
              className="h-8 w-8 p-0 cursor-pointer bg-taskhub-light hover:bg-taskhub-middle"
            >
              <MoreVertical size={16} className="text-font-secondary" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0 rounded-xl" align="end">
            <div className="grid">
              <Button
                size="sm"
                className="justify-start gap-2 h-12 text-lg cursor-pointer rounded-none rounded-t-lg bg-taskhub-middle hover:bg-taskhub-dark text-font-primarly"
                onClick={() => {
                  // TODO: Implement edit functionality
                  console.log('Edit task:', task.id);
                }}
              >
                <Edit size={14} />
                Edit Task
              </Button>
              <Button
                size="sm"
                className="justify-start gap-2 h-12 text-lg text-red-600 hover:text-red-70
                           cursor-pointer rounded-none rounded-b-lg bg-taskhub-middle hover:bg-taskhub-dark"
                onClick={() => {
                  // TODO: Implement delete functionality
                  console.log('Delete task:', task.id);
                }}
              >
                <Trash2 size={14} />
                Delete Task
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

function Profile() {
  const { isAuthenticated, user: userData } = useAuthStore();
  const {
    currentUser: { data: user, isLoading, error },
  } = useAuth();
  const { getMyTasks: userTasks } = useTasks();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-taskhub-light flex items-center justify-center px-4">
        <div className="text-center">
          <User size={80} className="mx-auto mb-4 text-font-secondary" />
          <p className="text-2xl font-bold text-font-primarly">
            Please log in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-taskhub-light flex items-center justify-center">
        <div className="text-center">
          <LoaderCircle size={60} className="animate-spin mx-auto mb-4 text-font-primarly" />
          <p className="text-xl font-semibold text-font-primarly">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-taskhub-light flex items-center justify-center px-4">
        <div className="text-center">
          <XCircle size={80} className="mx-auto mb-4 text-red-500" />
          <p className="text-2xl font-bold text-red-500 mb-2">Something went wrong</p>
          <p className="text-font-secondary">
            Error: {error.response?.data.description || 'Unknown error occurred'}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-taskhub-light flex items-center justify-center px-4">
        <div className="text-center">
          <User size={80} className="mx-auto mb-4 text-font-secondary" />
          <p className="text-2xl font-bold text-font-primarly">No user found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-taskhub-light">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-taskhub-middle rounded-xl p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="bg-taskhub-dark rounded-full p-4">
              <User size={48} className="text-font-primarly" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-font-primarly mb-2">
                Welcome, {user.name}!
              </h1>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail size={18} className="text-font-secondary" />
                  <span className="text-font-primarly">{user.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {userData?.is_verified ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <XCircle size={18} className="text-red-500" />
                  )}
                  <span className="text-font-primarly">
                    {userData?.is_verified ? "Verified" : "Not verified"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield size={18} className="text-font-secondary" />
                  <span className="text-font-primarly capitalize">{user.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-taskhub-middle rounded-xl p-8">
          <h2 className="text-2xl font-bold text-font-primarly mb-6 flex items-center space-x-2">
            <span>Your Tasks</span>
            {userTasks.data && userTasks.data.length > 0 && (
              <span className="bg-taskhub-dark text-font-primarly px-3 py-1 rounded-full text-sm font-medium">
                {userTasks.data.length}
              </span>
            )}
          </h2>

          {userTasks.isLoading && (
            <div className="text-center py-8">
              <LoaderCircle size={40} className="animate-spin mx-auto mb-4 text-font-primarly" />
              <p className="text-font-secondary">Loading your tasks...</p>
            </div>
          )}

          {userTasks.isError && (
            <div className="text-center py-8">
              <XCircle size={40} className="mx-auto mb-4 text-red-500" />
              <p className="text-red-500 font-semibold mb-2">Failed to load tasks</p>
              <p className="text-font-secondary">
                {userTasks.error?.response?.data?.description || 'Unknown error occurred'}
              </p>
            </div>
          )}

          {userTasks.isSuccess && userTasks.data.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-taskhub-light rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <User size={40} className="text-font-secondary" />
              </div>
              <p className="text-xl font-semibold text-font-primarly mb-2">No tasks yet</p>
              <p className="text-font-secondary">Start by creating your first task!</p>
            </div>
          )}

          {userTasks.isSuccess && userTasks.data.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {userTasks.data.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProfileRoute<TParent extends AnyRoute>(
  parentRoute: TParent
) {
  return createRoute({
    getParentRoute: () => parentRoute,
    path: "/demo/profile",
    component: Profile,
  });
}