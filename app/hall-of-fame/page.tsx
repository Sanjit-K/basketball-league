"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function HallOfFame() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100 ">
      <Navbar />
      <main className="flex-1 pt-40 pb-20 px-4 md:px-6 max-w-6xl mx-auto w-full">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
            Hall of Fame
          </h1>
          
        </header>

        {/* Champion Info Section */}
        <section className="mb-16">
          <div className="bg-gray-900 rounded-2xl border border-indigo-800 shadow-xl shadow-indigo-900/40 p-8">
            <h2 className="text-2xl font-bold text-indigo-200 mb-4 text-center md:text-left">
              Champion
            </h2>
            <div className="md:flex md:items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-3xl font-bold text-white mb-1">
                  Pipe My Tip
                </h3>
                <p className="text-base text-indigo-100 mb-2">
                  Prize:{" "}
                  <span className="font-semibold text-indigo-300">$159</span>
                </p>
                <p className="text-sm text-gray-400">
                  Winners of DIH Volleyball Summer ’25
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tournament Details */}
        <section className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Bracket */}
          <div>
            <h2 className="text-xl font-semibold text-indigo-200 mb-4">
              Tournament Bracket
            </h2>
            <div className="bg-gray-900 rounded-xl border border-gray-700 p-4 flex justify-center">
              <Image
                src="/Gradient Black Green Pixel Art Bracket Tournament Cover Page A4.png"
                alt="Tournament Bracket"
                width={500}
                height={500}
                className="object-contain max-h-80 rounded-md"
                priority
              />
            </div>
          </div>

          {/* Team Photo */}
          <div>
            <h2 className="text-xl font-semibold text-indigo-200 mb-4">
              Team Photo
            </h2>
            <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
              <Image
                src="/pipemytipteampic.jpeg"
                alt="Pipe My Tip Team Photo"
                width={500}
                height={500}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
