"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import { useSearchParams } from "next/navigation";

export default function PaymentPage() {
    const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "0";
  useEffect(() => {
    const duration = 5 * 1000; // 5 seconds
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 10 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);
  

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto p-6 text-white pt-40 relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Payment Instructions</h1>
        <p className="text-center mb-6 text-lg">
          Your total amount due is{" "}
          <span className="font-semibold text-green-400">${amount}</span>.
        </p>

        <div className="bg-gray-800 rounded p-6 space-y-4">
          <p>
            Please send your payment via <strong>Zelle</strong> to:
          </p>
          <p className="font-mono text-lg text-primary">+1 (214) 830-5303</p>

          <p>
            <strong>Important:</strong> When making the payment, please set the payment title/memo to your <strong>team name</strong>.
          </p>

          <p>
            Teams will be verified within 1-2 days after payment is confirmed. You can still log your match wins before verification.
          </p>

          <p className="italic text-gray-400 text-sm">
            If you have any questions, please contact us at dallasinternationalhoops@gmail.com.
          </p>
        </div>
      </div>
    </>
  );
}
