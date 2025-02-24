"use client";

import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 z-50"
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
    );
} 