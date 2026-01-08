import { FC } from "react";
import { createPortal } from "react-dom";
import { IconAlertTriangle } from "@tabler/icons-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "info";
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "info",
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-xl shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-full shrink-0 ${
              variant === "danger"
                ? "bg-rose-500/10 text-rose-500"
                : "bg-indigo-500/10 text-indigo-500"
            }`}
          >
            <IconAlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-100">{title}</h3>
            <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-bold text-white rounded-lg shadow-lg transition-all active:scale-95 ${
              variant === "danger"
                ? "bg-rose-600 hover:bg-rose-500 shadow-rose-500/20"
                : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmDialog;
