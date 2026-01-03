import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

const WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL_HERE';

export const useVoiceAssistant = (sessionId) => {
    const [state, setState] = useState('IDLE'); // IDLE, LISTENING, PROCESSING, SPEAKING
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState(null);

    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setError('Speech Recognition API not supported in this browser.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setState('LISTENING');
        };

        recognition.onresult = (event) => {
            const current = event.resultIndex;
            const result = event.results[current][0].transcript;
            setTranscript(result);
            processInput(result);
        };

        recognition.onerror = (event) => {
            if (event.error === 'aborted') return;
            console.error('Speech recognition error', event.error);
            setState('IDLE');
            setError(`Speech Recognition Error: ${event.error}`);
        };

        recognition.onend = () => {
            if (state === 'LISTENING') {
                setState('IDLE');
            }
        };

        recognitionRef.current = recognition;
    }, [state]);

    const processInput = async (text) => {
        setState('PROCESSING');
        try {
            let reply = "The system responded, but I couldn't parse the neural feedback.";

            try {
                const res = await axios.post(WEBHOOK_URL, {
                    message: text,
                    sessionId: sessionId,
                });

                console.log('n8n Response:', res.data);

                // Strictly extract 'reply' as per backend update
                if (res.data && res.data.reply && res.data.reply.trim() !== "") {
                    reply = res.data.reply;
                } else if (typeof res.data === 'string' && res.data.trim() !== "") {
                    reply = res.data;
                } else {
                    reply = "I received an empty response from the neural network.";
                }
            } catch (e) {
                console.error('Connection Error:', e);
                setError(e.response ? `n8n Error: ${e.response.status}` : 'Neural Link Timeout');

                reply = `Neural connection interrupted. Please ensure your n8n Test Webhook is active.`;
            }

            setResponse(reply);
            speak(reply);
        } catch (err) {
            setError('Core Logic Failure');
            setState('IDLE');
        }
    };

    const speak = (text) => {
        if (!synthRef.current) return;

        // Cancel any ongoing speech
        synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Voice Selection Logic
        const voices = synthRef.current.getVoices();
        const preferredVoices = ["Google US English", "Samantha", "Microsoft Zira"];

        let selectedVoice = voices.find(v => preferredVoices[0] === v.name) ||
            voices.find(v => preferredVoices[1] === v.name) ||
            voices.find(v => preferredVoices[2] === v.name) ||
            voices[0]; // Fallback

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        utterance.pitch = 1.0;
        utterance.rate = 1.0;

        utterance.onstart = () => {
            setState('SPEAKING');
        };

        utterance.onend = () => {
            setState('IDLE');
        };

        synthRef.current.speak(utterance);
    };

    const startListening = useCallback(() => {
        if (recognitionRef.current) {
            setError(null);
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.error("Recognition already started", e);
            }
        }
    }, []);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    }, []);

    return {
        state,
        transcript,
        response,
        error,
        startListening,
        stopListening
    };
};
