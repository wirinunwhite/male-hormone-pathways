# Male Hormone Pathways

An interactive visualization of male hormone pathways, steroidogenesis, and the effects of inhibitors like Finasteride and stress.

## Features

- **Interactive Map**: Visualize the conversion pathways from Cholesterol to DHT and Estrogen.
- **Simulations**: Toggle "Finasteride" to see how 5-alpha reductase inhibition affects DHT levels. Toggle "Stress" to see the "Pregnenolone Steal" and its impact on androgens.
- **Detailed Info**: Click on any hormone or enzyme to get detailed information about its function and role.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/wirinunwhite/male-hormone-pathways.git
    cd male-hormone-pathways
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running Locally

To start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the URL shown in your terminal).

### Building for Production

To build the application for deployment:

```bash
npm run build
```

The compiled files will be in the `dist` directory.

## Tech Stack

- **React**: UI Library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **TypeScript**: Type safety
- **Lucide React**: Icons
