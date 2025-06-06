import { createRoute, useParams, type AnyRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTasks } from "@/hooks/use-tasks";
import { 
  User, 
  Calendar, 
  Eye, 
  EyeOff, 
  CreditCard, 
  Plus,
  FileText,
  File,
  Link,
  Type,
  Lightbulb,
  HelpCircle,
  AlertTriangle,
  BarChart3,
  Star,
  Upload,
  X,
  CheckCircle
} from "lucide-react";
import type { AttachmentType } from "@/lib/types/tasks";
import UpdateTask from "@/components/Header/UpdateTask";
import DeleteTask from "@/components/Header/DeleteTask";

const AttachmentIcon = ({ type }: { type: AttachmentType }) => {
  const iconMap = {
    Description: FileText,
    DueDate: Calendar,
    File: File,
    Url: Link,
    Text: Type,
    Tip: Lightbulb,
    Hint: HelpCircle,
    Warning: AlertTriangle,
    Progress: BarChart3,
    Importance: Star,
  };
  
  const Icon = iconMap[type];
  return <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />;
};

const AttachmentCard = ({ attachment, index }: { attachment: any; index: number }) => {
  const getTypeColor = (type: AttachmentType) => {
    const colorMap = {
      Description: "from-blue-500 to-blue-600",
      DueDate: "from-purple-500 to-purple-600", 
      File: "from-green-500 to-green-600",
      Url: "from-cyan-500 to-cyan-600",
      Text: "from-gray-500 to-gray-600",
      Tip: "from-yellow-500 to-yellow-600",
      Hint: "from-indigo-500 to-indigo-600",
      Warning: "from-red-500 to-red-600",
      Progress: "from-emerald-500 to-emerald-600",
      Importance: "from-amber-500 to-amber-600",
    };
    return colorMap[type] || "from-gray-500 to-gray-600";
  };

  return (
    <div 
      className="group bg-gradient-to-br from-taskhub-light to-taskhub-middle rounded-xl border border-taskhub-middle/30 p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1 backdrop-blur-sm"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "slideInUp 0.6s ease-out forwards"
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-gradient-to-r ${getTypeColor(attachment.attachment_type)} shadow-lg`}>
          <AttachmentIcon type={attachment.attachment_type} />
        </div>
        <div>
          <span className="font-semibold text-font-primary text-lg capitalize tracking-wide">
            {attachment.attachment_type}
          </span>
          <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mt-1 transition-all duration-300 group-hover:w-16"></div>
        </div>
      </div>
      <div className="relative">
        <p className="text-font-secondary leading-relaxed transition-colors duration-300 group-hover:text-font-primary">
          {attachment.data}
        </p>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
      </div>
    </div>
  );
};

const AddAttachmentForm = ({ taskId, onClose, onSuccess }: { 
  taskId: number; 
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [attachmentType, setAttachmentType] = useState<AttachmentType>("Description");
  const [data, setData] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { addAttachment } = useTasks();

  const attachmentTypes: AttachmentType[] = [
    "Description", "DueDate", "File", "Url", "Text", 
    "Tip", "Hint", "Warning", "Progress", "Importance"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAttachment.mutate({
      id: taskId,
      attachment_type: attachmentType,
      data,
      file,
    }, {
      onSuccess: () => {
        onSuccess();
        onClose();
        setData("");
        setFile(null);
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-taskhub-darker/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-taskhub-light to-taskhub-middle rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl border border-taskhub-middle/20 animate-slideInScale">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-font-primary bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Add Attachment
            </h3>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
          </div>
          <button 
            onClick={onClose}
            className="text-font-secondary hover:text-red-500 transition-all duration-300 hover:rotate-90 hover:scale-110 p-2 rounded-full hover:bg-red-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-sm font-semibold text-font-primary mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
              Attachment Type
            </label>
            <select
              value={attachmentType}
              onChange={(e) => setAttachmentType(e.target.value as AttachmentType)}
              className="w-full px-4 py-3 border-2 border-taskhub-middle rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-taskhub-light text-font-primary transition-all duration-300 hover:border-blue-300"
            >
              {attachmentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="group">
            <label className="block text-sm font-semibold text-font-primary mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
              Content
            </label>
            <textarea
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Enter attachment content..."
              className="w-full px-4 py-3 border-2 border-taskhub-middle rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-taskhub-light text-font-primary transition-all duration-300 hover:border-blue-300 resize-none"
              rows={4}
              required
            />
          </div>

          {attachmentType === "File" && (
            <div className="group animate-slideDown">
              <label className="block text-sm font-semibold text-font-primary mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                File (Optional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 border-2 border-dashed border-taskhub-middle rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-taskhub-light text-font-primary transition-all duration-300 hover:border-blue-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 text-font-primary bg-taskhub-middle rounded-xl hover:bg-taskhub-dark transition-all duration-300 font-medium hover:scale-105 active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={addAttachment.isPending}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              {addAttachment.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Adding...
                </span>
              ) : (
                "Add Attachment"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TaskDetailPage = () => {
  const { id } = useParams({ strict: false }) as { id: string };
  const [showAddAttachment, setShowAddAttachment] = useState(false);
  const taskId = parseInt(id);
  
  const { getTaskFull } = useTasks();
  const { data: task, isLoading, error } = getTaskFull(taskId);

  if (isLoading) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-taskhub-light via-taskhub-middle to-taskhub-dark flex items-center justify-center">
        <div className="text-center flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-font-secondary mt-6 text-lg animate-pulse">Loading task details...</p>
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-taskhub-light via-taskhub-middle to-taskhub-dark flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="relative mb-6">
            <AlertTriangle className="w-20 h-20 text-red-500 mx-auto animate-bounce" />
            <div className="absolute inset-0 w-20 h-20 bg-red-500/20 rounded-full mx-auto animate-ping"></div>
          </div>
          <h2 className="text-3xl font-bold text-font-primary mb-4">Task Not Found</h2>
          <p className="text-font-secondary text-lg">The task you're looking for doesn't exist or you don't have access to it.</p>
        </div>
      </div>
    );
  }

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case "Private":
        return <EyeOff className="w-4 h-4" />;
      case "Public":
        return <Eye className="w-4 h-4" />;
      case "Paid":
        return <CreditCard className="w-4 h-4" />;
      default:
        return <Eye className="w-4 h-4" />;
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case "Private":
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg";
      case "Public":
        return "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30";
      case "Paid":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg";
    }
  };

  return (
    <div className="border-t-[2px] border-t-taskhub-middle/30 min-h-screen bg-gradient-to-br from-taskhub-light via-taskhub-middle/30 to-taskhub-dark/20">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="bg-gradient-to-br from-taskhub-light to-taskhub-middle/50 rounded-2xl shadow-2xl p-8 mb-8 border border-taskhub-middle/20 backdrop-blur-sm animate-slideInDown">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-font-primary mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient">
                {task.name}
              </h1>
              <div className="flex items-center gap-6 flex-wrap">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 ${getVisibilityColor(task.visibility)}`}>
                  {getVisibilityIcon(task.visibility)}
                  {task.visibility}
                </span>
                <span className="text-font-secondary text-sm bg-taskhub-middle/50 px-3 py-1 rounded-full">
                  ID: {task.id}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="animate-slideInRight" style={{ animationDelay: '0.2s' }}>
                <UpdateTask 
                  task={task} 
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                />
              </div>
              <div className="animate-slideInRight" style={{ animationDelay: '0.3s' }}>
                <DeleteTask 
                  task={task} 
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                />
              </div>
            </div>
          </div>
          
          {/* Owner Info */}
          <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-taskhub-middle/50 to-taskhub-middle/30 rounded-xl backdrop-blur-sm border border-taskhub-middle/30 animate-slideInUp" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-7 h-7 text-white" />
              </div>
              {task.owner.is_verified && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-bold text-font-primary text-lg">{task.owner.name}</p>
              <p className="text-font-secondary">{task.owner.email}</p>
              {task.owner.is_verified && (
                <span className="inline-flex items-center gap-2 text-sm text-green-600 font-medium mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Verified Account
                </span>
              )}
            </div>
            <div>
              <span className="px-4 py-2 bg-gradient-to-r from-taskhub-dark to-taskhub-darker text-font-secondary text-sm rounded-full font-medium shadow-md">
                {task.owner.role}
              </span>
            </div>
          </div>
        </div>

        {/* Attachments Section */}
        <div className="bg-gradient-to-br from-taskhub-light to-taskhub-middle/50 rounded-2xl shadow-2xl p-8 border border-taskhub-middle/20 backdrop-blur-sm animate-slideInUp" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-font-primary bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Attachments
              </h2>
              <p className="text-font-secondary mt-2">
                {task.attachments.length} {task.attachments.length === 1 ? 'attachment' : 'attachments'} found
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-3"></div>
            </div>
            <button
              onClick={() => setShowAddAttachment(true)}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group"
            >
              <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              Add Attachment
            </button>
          </div>

          {task.attachments.length === 0 ? (
            <div className="text-center py-16 animate-fadeIn">
              <div className="relative mb-6">
                <Upload className="w-24 h-24 text-taskhub-middle mx-auto" />
                <div className="absolute inset-0 w-24 h-24 bg-blue-500/10 rounded-full mx-auto animate-ping"></div>
              </div>
              <h3 className="text-2xl font-bold text-font-primary mb-3">No attachments yet</h3>
              <p className="text-font-secondary mb-8 text-lg">Add your first attachment to enhance this task</p>
              <button
                onClick={() => setShowAddAttachment(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group"
              >
                <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                Create First Attachment
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {task.attachments.map((attachment, index) => (
                <AttachmentCard key={index} attachment={attachment} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Attachment Modal */}
      {showAddAttachment && (
        <AddAttachmentForm
          taskId={taskId}
          onClose={() => setShowAddAttachment(false)}
          onSuccess={() => {
            // Task data will be automatically refreshed due to query invalidation
          }}
        />
      )}
      
      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideInScale {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-slideInDown {
          animation: slideInDown 0.6s ease-out forwards;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        
        .animate-slideInScale {
          animation: slideInScale 0.4s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default function TaskDetailRoute<TParent extends AnyRoute>(
  parentRoute: TParent
) {
  return createRoute({
    getParentRoute: () => parentRoute,
    path: "/task/$id",
    component: TaskDetailPage,
  });
}