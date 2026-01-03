import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Orb from './components/Orb';
import { useVoiceAssistant } from './hooks/useVoiceAssistant';

function App() {
    const [sessionId] = React.useState(() =>
        typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11)
    );

    const { state, transcript, response, error, startListening, stopListening } = useVoiceAssistant(sessionId);

    const isListening = state === 'LISTENING';
    const isSpeaking = state === 'SPEAKING';
    const isProcessing = state === 'PROCESSING';

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center overflow-hidden select-none font-mono">

            {/* CENTRAL INTERACTION UNIT */}
            <div className="relative flex flex-col items-center justify-center">

                {/* THE LIVING ORB (Interactive) */}
                <div
                    className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] cursor-pointer transition-transform duration-500 active:scale-95"
                    onClick={toggleListening}
                >
                    <Orb
                        hue={isListening ? 140 : (isProcessing ? 40 : (isSpeaking ? 190 : 200))}
                        hoverIntensity={isSpeaking ? 1.0 : (isListening ? 0.8 : 0.4)}
                        forceHoverState={isListening || isSpeaking || isProcessing}
                    />
                </div>

                {/* SUBTITLES: Positioned directly beneath the Orb */}
                <div className="absolute top-[100%] mt-8 w-[80vw] max-w-2xl flex flex-col items-center">
                    <AnimatePresence mode="wait">
                        {(transcript || response) ? (
                            <motion.div
                                key={response || transcript}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col items-center"
                            >
                                <p
                                    className="text-xs md:text-sm tracking-[0.2em] text-center text-cyan-400"
                                    style={{
                                        fontFamily: "'Orbitron', sans-serif",
                                        textShadow: '0 0 10px #22d3ee, 0 0 20px #22d3ee, 0 0 40px #22d3ee'
                                    }}
                                >
                                    {response || transcript}
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.3 }}
                                className="flex flex-col items-center"
                            >
                                <span
                                    className="text-[10px] uppercase tracking-[0.8em] font-light text-cyan-400"
                                    style={{
                                        fontFamily: "'Orbitron', sans-serif",
                                        textShadow: '0 0 10px rgba(34, 211, 238, 0.5)'
                                    }}
                                >
                                    System Ready
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* STATUS INDICATOR (Minimalist Footer) */}
            <div className="absolute bottom-10 w-full text-center">
                <p className="text-[9px] uppercase tracking-[0.5em] text-white/20">
                    {state}
                </p>
            </div>

        </div>
    );
}

export default App;
