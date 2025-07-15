"use client"

import { useState } from "react"
import Image from "next/image"

export default function DoubleElimTable() {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-white text-center mb-4 drop-shadow-lg animate-pulse">
        Tournament Bracket
      </h2>
      <div
        className={`relative transition-transform duration-300 ease-in-out ${
          zoomed ? 'z-50 scale-150 fixed inset-0 bg-black/80 flex items-center justify-center' : 'hover:scale-105 cursor-zoom-in'
        }`}
        onClick={() => setZoomed(!zoomed)}
      >
        <Image
          src="/Gradient Black Green Pixel Art Bracket Tournament Cover Page A4.png"
          alt="Tournament Bracket"
          width={zoomed ? 1200 : 600}
          height={zoomed ? 1700 : 850}
          className={`rounded-lg border-4 border-green-400 shadow-2xl transition-all duration-300 ${zoomed ? 'cursor-zoom-out' : ''}`}
          style={{
            maxWidth: '90vw',
            maxHeight: zoomed ? '90vh' : '60vh',
            objectFit: 'contain',
          }}
          priority
        />
      </div>
      <p className="mt-4 text-white/80 text-center text-sm">
        Click the bracket to {zoomed ? 'exit zoom' : 'zoom in'}.
      </p>
    </div>
  );
}
