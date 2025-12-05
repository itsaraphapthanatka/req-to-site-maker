import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  videoUrl: string;
  open: boolean;
  onClose: () => void;
}

export default function VideoModal({ videoUrl, open, onClose }: Props) {
  if (!open) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl z-[10000]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 z-[100] bg-black/60 hover:bg-black/80 text-white p-2 rounded-full"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <video src={videoUrl} controls autoPlay className="w-full h-full object-cover" />
      </motion.div>
    </motion.div>,
    document.body
  );
}
