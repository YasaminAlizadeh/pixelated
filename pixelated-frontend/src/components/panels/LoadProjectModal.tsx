import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  IconX,
  IconLoader,
  IconFolder,
  IconTrash,
  IconCalendar,
} from "@tabler/icons-react";
import { ProjectData } from "../../context/CanvasContext";
import { AuthContext } from "context/AuthContext";
import { ToastContext } from "context/ToastContext";
import ConfirmDialog from "components/ui/ConfirmDialog";

interface LoadProjectModalProps {
  onClose: () => void;
  onLoad: (project: ProjectData) => void;
}

const LoadProjectModal: React.FC<LoadProjectModalProps> = ({
  onClose,
  onLoad,
}) => {
  const { token, logout } = useContext(AuthContext)!;
  const { toast } = useContext(ToastContext)!;

  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const fetchProjects = useCallback(() => {
    if (!token) return;

    setLoading(true);
    fetch(`${API_URL}/api/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          logout();
          onClose();
          throw new Error("Session expired");
        }

        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not connect to server.");
        setLoading(false);
      });
  }, [API_URL, token, logout, onClose]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDeleteClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjectToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      const res = await fetch(`${API_URL}/api/projects/${projectToDelete}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== projectToDelete));
        toast.success("Project deleted");
      } else {
        toast.error("Failed to delete project");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting project");
    } finally {
      setProjectToDelete(null); // Close dialog
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[80vh] border border-slate-100">
        <header className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
          <h3 className="font-bold text-slate-700 text-lg flex items-center gap-2">
            <div className="p-2 bg-rose-50 text-rose-500 rounded-lg">
              <IconFolder size={20} />
            </div>
            Load Project
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
          >
            <IconX size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-2 bg-slate-50/50">
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-3">
              <IconLoader className="animate-spin text-rose-500" size={32} />
              <span className="text-sm font-medium">Loading projects...</span>
            </div>
          )}

          {error && (
            <div className="m-4 p-4 text-rose-600 bg-rose-50 rounded-xl border border-rose-100 text-sm text-center">
              {error}
            </div>
          )}

          {!loading && !error && projects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-2">
              <IconFolder size={48} className="text-slate-200 mb-2" />
              <p className="text-sm font-medium text-slate-500">
                No saved projects found.
              </p>
              <p className="text-xs text-slate-400">
                Save a project to see it here.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2 p-2">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onLoad(project)}
                className="group relative flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-rose-300 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-rose-500 transition-colors">
                  <span className="text-xs font-bold font-mono">PX</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-slate-700 group-hover:text-rose-600 truncate pr-2">
                      {project.name || "Untitled Project"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-1">
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                      {project.width} x {project.height}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                      <IconCalendar size={10} />
                      ID: {project.id}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => handleDeleteClick(project.id, e)}
                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete Project"
                >
                  <IconTrash size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ConfirmDialog
        isOpen={!!projectToDelete}
        title="Delete Project?"
        message="Are you sure you want to delete this project? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setProjectToDelete(null)}
        variant="danger"
        confirmText="Delete"
      />
    </div>
  );
};

export default LoadProjectModal;
