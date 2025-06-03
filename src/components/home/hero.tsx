"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogIn, User, Nut, Apple, EggFried, Fish, Carrot, Salad, Cherry, Croissant } from "lucide-react";
import Link from "next/link";

const floatingFoods = [
    {
        icon: Carrot,
        className: "absolute top-10 left-10 text-orange-400 opacity-20 pointer-events-none",
        animate: { y: [0, 14, 0] },
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0 },
    },
    {
        icon: Apple,
        className: "absolute top-20 right-12 text-red-400 opacity-20 pointer-events-none",
        animate: { y: [0, -12, 0] },
        transition: { duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
    },
    {
        icon: EggFried,
        className: "absolute bottom-24 left-6 text-amber-400 opacity-20 pointer-events-none",
        animate: { y: [0, 10, 0] },
        transition: { duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 0.1 },
    },
    {
        icon: Fish,
        className: "absolute top-16 left-1/2 text-blue-400 opacity-20 pointer-events-none hidden md:block",
        animate: { y: [0, 8, 0] },
        transition: { duration: 6.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
    },
    {
        icon: Nut,
        className: "absolute bottom-28 right-6 text-yellow-900 opacity-20 pointer-events-none sm:invisible",
        animate: { y: [0, 6, 0] },
        transition: { duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
    },
    {
        icon: Salad,
        className: "absolute top-8 left-1/3 text-green-500 opacity-20 pointer-events-none hidden md:block",
        animate: { y: [0, 11, 0] },
        transition: { duration: 6.3, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
    },
    {
        icon: Cherry,
        className: "absolute bottom-16 right-4 text-red-400 opacity-20 pointer-events-none hidden md:block",
        animate: { y: [0, 13, 0] },
        transition: { duration: 7.1, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
    },
    {
        icon: Croissant,
        className: "absolute top-40 left-2 text-yellow-400 opacity-20 pointer-events-none",
        animate: { y: [0, 7, 0] },
        transition: { duration: 6.6, repeat: Infinity, ease: "easeInOut", delay: 0.25 },
    }
];


export default function Hero() {
    return (
        <section className="relative flex flex-1 flex-col items-center justify-center text-center px-6 py-24 md:py-32 bg-gradient-to-b from-[#f0f4ff] to-white overflow-hidden">
            {floatingFoods.map(({ icon: Icon, className, animate, transition }, i) => (
                <motion.div
                    key={i}
                    className={className}
                    animate={animate}
                    transition={transition}
                    aria-hidden="true"
                >
                    <Icon size={72} />
                </motion.div>
            ))}

            <motion.div
                className="absolute top-0 left-0 w-full h-full -z-10"
                initial={{ y: -20 }}
                animate={{ y: 20 }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            >
                <svg className="w-full h-full opacity-10" viewBox="0 0 200 200" fill="none">
                    <circle cx="60" cy="60" r="40" fill="#3b82f6" />
                    <circle cx="160" cy="160" r="30" fill="#60a5fa" />
                </svg>
            </motion.div>

            {/* Headline */}
            <motion.h1
                className="text-4xl md:text-5xl font-extrabold text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                itadaki 🍽️
            </motion.h1>

            {/* Subtext */}
            <motion.p
                className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                Your simple, flexible food tracking companion. Log meals, scan barcodes, set nutrition goals—and take control of your health, anywhere.
            </motion.p>

            {/* Call to action */}
            <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                <Button size="lg" className="w-full sm:w-auto">
                    <User className="mr-2 h-5 w-5" />
                    Try as Guest
                </Button>
                <Link href="/login" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                        <LogIn className="mr-2 h-5 w-5" />
                        Login
                    </Button>
                </Link>
            </motion.div>

            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none z-10">
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="w-full h-24"
                >
                    <path
                        d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z"
                        fill="#f8fafc"  // Tailwind's slate-50
                    />
                </svg>
            </div>
        </section>
    );
}
