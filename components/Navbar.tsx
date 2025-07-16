"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";



export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { name: "Home", href: "/" },
    { name: "Hall of Fame", href: "/hall-of-fame" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 border-b border-gray-800/30 backdrop-blur-sm bg-gray-900/70 z-50">
      <div className="container mx-auto py-2 px-4 flex items-center justify-between">
        <Link href="/" className="relative w-48 h-20 right-10">
          <Image
            src="/logodih.png"
            alt="Dallas International Hoopers Logo"
            fill
            style={{ objectFit: "contain"}}
            
            priority
          />
        </Link>

        {/* Hamburger button - visible on small screens */}
        <button
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {/* Simple hamburger icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              // X icon when open
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              // Hamburger lines when closed
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        {/* Navigation menu */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-full left-0 right-0 bg-gray-900/90 border-b border-gray-800 md:static md:flex md:bg-transparent md:border-none md:space-x-8`}
        >
          <ul className="flex flex-col md:flex-row px-4 md:px-0 py-2 md:py-0 md:space-x-6 space-y-2 md:space-y-0">
            {tabs.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                <li key={tab.name}>
                    <Link
                    href={tab.href}
                    className={`block text-lg font-medium px-3 py-2 rounded-md transition-colors ${
                        isActive
                        ? "bg-primary text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                    onClick={() => setMenuOpen(false)}
                    >
                    {tab.name}
                    </Link>
                </li>
                );
            })}
            </ul>
        </nav>
      </div>
    </header>
  );
}
