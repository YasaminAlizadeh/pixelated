import { FC } from "react";
import { motion } from "framer-motion";
import { IconCheck, IconX, IconInfoCircle } from "@tabler/icons-react";
import { ToastMessage } from "context/ToastContext";

interface ToastProps extends ToastMessage {
  onClose: () => void;
}

const Toast: FC<ToastProps> = ({ type, message, onClose }) => {
  const variants = {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  const styles = {
    success: "border-l-emerald-500 text-emerald-100 bg-zinc-900",
    error: "border-l-rose-500 text-rose-100 bg-zinc-900",
    info: "border-l-indigo-500 text-indigo-100 bg-zinc-900",
  };

  const icons = {
    success: <IconCheck size={18} className="text-emerald-500" />,
    error: <IconX size={18} className="text-rose-500" />,
    info: <IconInfoCircle size={18} className="text-indigo-500" />,
  };

  return (
    <motion.div
      layout
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`pointer-events-auto min-w-[300px] max-w-sm p-4 rounded-lg shadow-2xl border border-zinc-800 border-l-4 flex items-start gap-3 backdrop-blur-md ${styles[type]}`}
    >
      <div className="mt-0.5 shrink-0">{icons[type]}</div>
      <p className="text-sm font-medium leading-tight pt-0.5">{message}</p>
      <button
        onClick={onClose}
        className="ml-auto text-zinc-500 hover:text-white transition-colors"
      >
        <IconX size={16} />
      </button>
    </motion.div>
  );
};

export default Toast;
