# 📿 DigiMala

**DigiMala** is a modern, digital chanting companion designed to help you maintain and track your spiritual practices. Whether you follow traditional mantras or have your own personal affirmations, DigiMala provides a serene and interactive environment for your daily sadhana.

## ✨ Features

- **Interactive Chanting**: Tap word-by-word to recite mantras, keeping you focused on the text.
- **Multi-Language Support**: Built-in support for mantras in **Hindi**, **Gujarati**, and **English**.
  - *Mahamrityunjaya Mantra*
  - *Navkar Mantra*
  - *Gayatri Mantra*
  - *Saraswati Vandana*
- **Custom Mantras**: Create, save, and edit your own custom mantras.
- **Spiritual Journey Tracking**:
  - **Streak Counter**: Track your daily consistency.
  - **Daily Goals**: Set and monitor daily chant targets (default 108).
  - **Gamification**: Progress through levels from *Novice* to *Enlightened*.
  - **Weekly Analytics**: View your activity over the last 7 days.
- **Manual Mode**: A simple tap counter for manual chanting without text.
- **Personalization**:
  - **Dark Mode**: Toggle between light and dark themes for comfortable reading.
  - **User Profiles**: Personalized greeting and tracking.
- **Mobile Ready**: Built with Capacitor for seamless Android integration.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Mobile Runtime**: [Capacitor](https://capacitorjs.com/)

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/erhardik/Digimala.git
    cd Digimala
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open your browser and navigate to the URL shown (usually `http://localhost:5173`).

## 📱 Building for Android

This project uses Capacitor to run on Android.

1.  **Build the web assets**:
    ```bash
    npm run build
    ```

2.  **Sync with Capacitor**:
    ```bash
    npx cap sync
    ```

3.  **Open in Android Studio**:
    ```bash
    npx cap open android
    ```
    From Android Studio, you can run the app on an emulator or a physical device.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.