# ☁️ Cloud Sticky Note Wall (云端灵感便利贴墙)

A collaborative, real-time(ish) digital sticky note wall where users can post ideas, thoughts, and moods. Built with modern web technologies for the Huawei Cloud Application Construction challenge.

![Cloud Wall Project](https://via.placeholder.com/800x400?text=Cloud+Sticky+Wall+Preview)

## ✨ Features

- **Dynamic Sticky Wall**: A masonry-style grid of colorful notes.
- **Create Ideas**: Post new notes with customizable colors (Yellow, Blue, Pink, Green, Purple).
- **Interactive**: Like notes to show appreciation.
- **Harmonious UI**: Glassmorphism effects, dark mode, and smooth transitions.
- **Tech Stack**:
    - **Frontend**: Vite + React + TypeScript + Vanilla CSS
    - **Backend**: Node.js + Express (REST API)
    - **Database**: LowDB (Local JSON, perfect for ECS single-instance)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+

### Installation

1.  Clone the repository.
    ```bash
    git clone https://github.com/YOUR_USERNAME/sticky-note-wall.git
    cd sticky-note-wall
    ```

2.  Install dependencies for both Client and Server.
    ```bash
    # Install Client deps
    cd client
    npm install

    # Install Server deps
    cd ../server
    npm install
    ```

3.  Start the Application.
    *   **Server** (Port 3000):
        ```bash
        cd server
        npm run dev
        ```
    *   **Client** (Port 5173):
        ```bash
        cd client
        npm run dev
        ```

4.  Open `http://localhost:5173` in your browser.

## 🛠 Deployment on Huawei Cloud ECS

1.  **Provision ECS**: Buy a basic Elastic Cloud Server (Ubuntu/CentOS).
2.  **Environment**: Install Node.js 18.
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```
3.  **Upload Code**: Use git clone or SCP.
4.  **Run**: Use `pm2` to keep the server running.
    ```bash
    npm install -g pm2
    cd server && pm2 start index.js --name "api"
    cd ../client && npm run build
    npx serve dist -p 80
    ```

## 📝 License

ISC
