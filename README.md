# Pixelated 🎨 - A Browser-Based Pixel Art Editor

A full-featured, browser-based pixel art editor built from the ground up with React and TypeScript, designed to provide a comprehensive suite of tools for artists.

[![Pixelated Preview](https://i.postimg.cc/zBFbdwvb/Screenshot-2025-09-22-114921.png)](https://postimg.cc/sQ1gxhps)

## ✨ What is this?

As a personal project and a deep dive into complex state management, I conceived, designed, and developed **Pixelated**, a complete pixel art editor that runs right in your browser. My goal was to create an application that felt powerful yet intuitive, giving artists the tools they need to bring their ideas to life, pixel by pixel.

The application provides a robust layering system, custom color palette management, a variety of drawing tools, and the ability to import and export artwork.

### Core Features

* **🎨 Full Suite of Drawing Tools:** Includes a pixel-perfect **pencil**, a smart **bucket fill** tool that respects boundaries, an **eraser**, and an **eyedropper** for quick color sampling.
* **📚 Sophisticated Layering System:** A non-destructive layering system built from scratch. Users can add, remove, rename, reorder (via drag-and-drop), and toggle the visibility of layers.
* **🎨 Custom Color & Palette Management:** Create, save, and switch between custom color palettes to streamline your workflow.
* **💾 Import & Export:** Easily import reference images onto a layer or export your final creation as a PNG file.
* **↔️ Undo/Redo Functionality:** A custom hook (`useHistory`) manages the canvas state, providing multi-level undo and redo capabilities for every action.
* **🖼️ Dynamic Canvas:** The canvas is fully responsive to its container, and users can change the grid dimensions on the fly.

---

## 🔧 Tech Stack & Architecture

This project was a fantastic exercise in managing complex, fine-grained state and interacting directly with the browser's rendering engine.

* **Core Library:** **React** (using the Context API for state management)
* **Language:** **TypeScript**
* **Rendering:** **HTML Canvas API** (all drawing logic, including the grid, layers, and tools, is handled by manipulating canvas data)
* **Styling:** **Tailwind CSS** & vanilla CSS for a clean, component-based design.
* **Drag & Drop:** **Framer Motion** for reordering layers smoothly.
* **Tooling:** **Vite** for a fast and modern development environment.

### Architectural Highlights

1.  **Canvas & Layer Management (`CanvasContext.tsx`)**
    The core of the application. The `CanvasContext` manages an array of `layer` objects. Each layer has its own ID, name, visibility state, and a reference to its `<canvas>` element. A separate canvas is rendered for each layer, and they are visually stacked using CSS grid, allowing for independent drawing and reordering.

2.  **Undo/Redo with a Custom Hook (`useHistory.tsx`)**
    Instead of storing large image states, the `useHistory` hook manages an array of "moves." Each move is an array of `PointChange` objects (`{x, y, color}`). This is far more memory-efficient. The hook exposes `undo`, `redo`, and `isUndo/isRedoPossible` states, providing complete control over the drawing history of the active layer.

3.  **Efficient Drawing Logic**
    The application doesn't re-render the entire canvas on every mouse move. It calculates the pixel position under the cursor and only draws the necessary pixel. The `handleFill` (bucket tool) function implements a non-recursive flood-fill algorithm using a stack to prevent call stack overflow on large areas.

4.  **Decoupled State (`ColorContext.tsx`)**
    All color-related state, including the currently selected color, color history, and user-created palettes, is managed separately in `ColorContext`. This keeps the canvas logic purely focused on drawing pixels and layers.

---

## 🏃‍♂️ Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YasaminAlizadeh/pixelated.git
    cd pixelated
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:5173](http://localhost:5173) (or whatever port Vite assigns) to start creating!
