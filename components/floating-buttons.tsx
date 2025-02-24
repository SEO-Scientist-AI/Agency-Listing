"use client";

import { FaWhatsapp } from "react-icons/fa";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingButtons() {
    return (
        <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-3">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="drop-shadow-2xl"
            >
                <a
                    href="https://calendly.com/seo-scientist/30min"
                    className="flex items-center justify-center w-12 h-12 bg-orange-500 rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-300 group"
                    aria-label="Schedule a Demo"
                >
                    <Calendar className="w-5 h-5 text-white" />
                    <span className="absolute right-full mr-2 px-2 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap">
                        Schedule a Call
                    </span>
                </a>
            </motion.div>

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="drop-shadow-2xl"
            >
                <a
                    href="https://wa.link/1hlrn5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-[#25D366] rounded-full shadow-lg hover:bg-[#1EA952] transition-colors duration-300 group"
                    aria-label="Chat on WhatsApp"
                >
                    <FaWhatsapp className="w-6 h-6 text-white" />
                    <span className="absolute right-full mr-2 px-2 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap">
                        Chat with us
                    </span>
                </a>
            </motion.div>
        </div>
    );
} 