# Jarvis Voice Assistant 🦾

A premium, minimalist AI voice assistant interface built with **React**, **Vite**, and **Framer Motion**. This project features a living "Orb" core that visualizes state changes and provides a futuristic, interactive user experience.

![Jarvis Orb Interface Mockup](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000) *(Placeholder image for the UI)*

## 📺 Project Demonstration
See the assistant in action: [Video Working Proof](https://drive.google.com/file/d/1m6VfPwz6clizpbY6iArVa5w6Ync2UUhK/view?usp=sharing)

## ✨ Features

-   **🎙️ Natural Voice Interaction**: Seamless voice-to-text conversion using the Web Speech API.
-   **🧠 Intelligent Processing**: Integrated with n8n (or any compatible webhook) to provide AI-powered responses.
-   **🎨 Living Orb UI**: A dynamic, GL-powered central orb that reacts to listening, processing, and speaking states.
-   **🔊 Neural Voice Feedback**: High-quality text-to-speech synthesis with customizable voices.
-   **🌑 Minimalist Aesthetics**: Dark mode by default with glowing neon accents and premium typography.
-   **📱 Responsive Design**: Fully optimized for various screen sizes, from mobile to desktop.

## 🚀 Tech Stack

-   **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Graphics**: [OGL](https://github.com/o-gl/ogl) (Minimal WebGL library)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Backend Connection**: [Axios](https://axios-http.com/) linked to an [n8n](https://n8n.io/) workflow.

## 🛠️ Installation & Setup

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/[YOUR_GITHUB_USERNAME]/jarvis-voice-assistant.git
    cd jarvis-voice-assistant
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure the AI Engine**
    Open `src/hooks/useVoiceAssistant.js` and replace the `WEBHOOK_URL` placeholder with your n8n (or similar) webhook URL:
    ```javascript
    const WEBHOOK_URL = 'YOUR_ACTUAL_WEBHOOK_URL_HERE';
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```
    Access the application at `http://localhost:5173`.

## 🎮 How to Use

1.  **Grant Microphone Permissions**: Ensure your browser allows microphone access for the site.
2.  **Activate**: Click the central **Orb** to start listening.
3.  **Command**: Speak your prompt clearly. The Orb will turn **green** while listening and **orange** while processing.
4.  **Respond**: Jarvis will respond with text subtitles and vocal feedback (the Orb will turn **cyan** while speaking).

## 🧩 n8n Integration (Recommended)

This assistant is designed to work perfectly with an n8n workflow. A typical setup includes:
-   **Webhook Node**: Receives the `message` and `sessionId`.
-   **AI Agent Node**: Process the input using Gemini, OpenAI, or Claude.
-   **Response Node**: Returns a JSON object in the format `{"reply": "Your response here"}`.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have ideas for improvements or new features.

## 📜 License

Distributed under the ISC License. See `LICENSE` for more information.

---

*Crafted with ⚡ by nandini khandelwal*
