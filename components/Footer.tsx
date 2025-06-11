import Link from "next/link";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800/30 py-6 backdrop-blur-sm z-10">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-xl font-bold text-primary mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Dallas International Hoopers
        </motion.h2>
        <motion.div
          className="flex justify-center items-center space-x-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="https://www.instagram.com/dallas.international.hoopers/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-primary transition"
          >
            <Instagram className="h-6 w-6" />
          </Link>
        </motion.div>
      </div>
    </footer>
  );
}
