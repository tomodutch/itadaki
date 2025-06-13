import React from "react";
import { motion } from "framer-motion";

const heartPath =
    "M5 9S1 6 1 3.5C1 2 2 1 3.5 1C4.5 1 5 2 5 2S5.5 1 6.5 1C8 1 9 2 9 3.5C9 6 5 9 5 9Z";

export interface HeartProgressChartData {
    name: string;
    value: number;
    max: number;
    colorStart: string;
    colorEnd: string;
}

interface HeartProgressChartProps {
    data: HeartProgressChartData[];
    mode: "animate" | "static"
}

export function HeartProgressChart(props: HeartProgressChartProps) {
    const { data } = props;
    const baseScale = 30;
    const center = { x: 150, y: 150 };
    const doAnimate = props.mode === "animate"

    return (
        <div className="flex flex-wrap justify-center items-center gap-6 max-w-xl mx-auto select-none font-sans">
            <svg
                viewBox="0 0 300 300"
                width="100%"
                height="auto"
                className="max-w-[300px] flex-shrink-0"
            >
                <defs>
                    {data.map((d, i) => (
                        <linearGradient key={`grad${i}`} id={`grad${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={d.colorStart} />
                            <stop offset="100%" stopColor={d.colorEnd} />
                        </linearGradient>
                    ))}
                    {/* Single surplus gradient (can be reused across all layers) */}
                    <linearGradient id="surplus-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1f2937" />
                        <stop offset="100%" stopColor="#4b5563" />
                    </linearGradient>
                </defs>

                {data.map((d, i) => {
                    const scale = 1 - i * 0.1;
                    const percent = Math.min(d.value / d.max, 1);
                    const maskHeight = 10 * percent;
                    const hasSurplus = d.value > d.max;
                    const surplusPercent = hasSurplus ? Math.min((d.value - d.max) / d.max, 1) : 0;
                    const surplusHeight = 10 * surplusPercent;

                    return (
                        <g
                            key={`heart-${i}`}
                            transform={`translate(${center.x}, ${center.y}) scale(${scale * baseScale}) translate(-5, -5)`}
                        >
                            {/* Background heart */}
                            <path d={heartPath} fill="#f3f4f6" />

                            {/* Gradient progress fill with mask */}
                            <mask id={`mask${i}`}>
                                {doAnimate && (
                                    <motion.rect
                                        initial={{ height: 0, y: 10 }}
                                        animate={{ height: maskHeight, y: 10 - maskHeight }}
                                        transition={{ duration: 1, ease: "easeOut", delay: i * 0.3 }}
                                        x="0"
                                        width="10"
                                        fill="white"
                                    />
                                )}
                                {!doAnimate && (
                                    <rect
                                        x="0"
                                        width="10"
                                        fill="white"
                                        height={maskHeight}
                                        y={10 - maskHeight}
                                    />
                                )}

                            </mask>
                            <path d={heartPath} fill={`url(#grad${i})`} mask={`url(#mask${i})`} />

                            {/* Surplus overlay if value > max */}
                            {hasSurplus && (
                                <>
                                    <mask id={`surplus-mask-${i}`}>
                                        {doAnimate && (
                                            <motion.rect
                                                initial={{ height: 0, y: 0 }}
                                                animate={{ height: surplusHeight, y: 10 - surplusHeight }}
                                                transition={{ duration: 1, ease: "easeOut", delay: i * 0.3 + 0.5 }}
                                                x="0"
                                                width="10"
                                                fill="white"
                                            />
                                        )}
                                        {!doAnimate && (
                                            <rect
                                                height={surplusHeight}
                                                y={10 - surplusHeight}
                                                x="0"
                                                width="10"
                                                fill="white"
                                            />
                                        )}
                                    </mask>
                                    <path
                                        d={heartPath}
                                        fill="url(#surplus-gradient)"
                                        mask={`url(#surplus-mask-${i})`}
                                        opacity={0.6}
                                    />
                                </>
                            )}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
