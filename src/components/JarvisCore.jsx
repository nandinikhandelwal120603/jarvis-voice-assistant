import React from 'react';
import { motion } from 'framer-motion';

const JarvisCore = ({ state }) => {
    const isListening = state === 'LISTENING';
    const isProcessing = state === 'PROCESSING';

    return (
        <div className="relative flex items-center justify-center w-72 h-72 md:w-96 md:h-96">

            {/* Outer Glow Halo */}
            <motion.div
                className="absolute w-full h-full rounded-full border border-jarvis-cyan opacity-20"
                style={{ boxShadow: '0 0 40px var(--jarvis-glow)' }}
                animate={{
                    scale: isListening ? [1, 1.1, 1] : [1, 1.05, 1],
                    opacity: isListening ? [0.2, 0.4, 0.2] : 0.2
                }}
                transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Main Pulsing Orb Container */}
            <div className="relative w-[80%] h-[80%] flex items-center justify-center">

                {/* Decorative Ring 1 */}
                <motion.div
                    className="absolute w-full h-full rounded-full border-2 border-dashed border-jarvis-cyan opacity-30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                {/* Decorative Ring 2 */}
                <motion.div
                    className="absolute w-[90%] h-[90%] rounded-full border border-jarvis-cyan opacity-40"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />

                {/* The Core Orb */}
                <motion.div
                    className="relative w-[70%] h-[70%] rounded-full bg-black/40 border-2 border-jarvis-cyan flex items-center justify-center overflow-hidden cyan-glow-border"
                    animate={{
                        scale: isListening ? [1, 1.08, 1] : [1, 1.02, 1],
                        borderColor: isProcessing ? '#f59e0b' : '#00f0ff'
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    {/* Inner Core Glow */}
                    <motion.div
                        className="absolute w-[80%] h-[80%] rounded-full bg-jarvis-cyan blur-2xl opacity-20"
                        animate={{
                            opacity: isListening ? [0.2, 0.6, 0.2] : [0.1, 0.3, 0.1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Central Bright Point - The "Eye" */}
                    <motion.div
                        className="w-12 h-12 bg-white rounded-full shadow-[0_0_20px_white,0_0_40px_var(--jarvis-cyan)]"
                        animate={{
                            scale: isListening ? [1, 1.2, 1] : 1,
                            filter: isListening ? 'brightness(1.5)' : 'brightness(1)'
                        }}
                    />
                </motion.div>
            </div>

            {/* Floating Orbital Dots (Simple) */}
            {[...Array(2)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-jarvis-cyan rounded-full "
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8 + i * 4, repeat: Infinity, ease: "linear" }}
                    style={{
                        translateY: -140 - i * 15,
                        boxShadow: '0 0 10px var(--jarvis-cyan)'
                    }}
                />
            ))}
        </div>
    );
};

export default JarvisCore;
