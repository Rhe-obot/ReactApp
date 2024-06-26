# React + TypeScript + Vite

This is a React application that fetches data from an API  with a modal view for detailed information. This application uses React context to manage click counts and a React-Router for routng with the Analytics page and a responsive design.

## Features

- Display the data with thumbnails, titles, and content.
- Show detailed information in a modal on clicking "Learn More".
- Responsive interface for various screen sizes.
- Context-based click count tracking.
- Analytics page displaying click data.

## Installation

This project is set up using Vite, React, and TypeScript. Follow the steps below to get started.

### Prerequisites

Ensure you have the following installed:

- Node.js 
- npm 

### Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/react-article-display.git
    cd REACTAPP
    ```

2. **Install dependencies**

    Using npm:

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

### Running the Development Server

To start the development server, use:

Using npm:

```bash
npm run dev
```

This will start the development server and you can view the application at http://localhost:5173.


#### JSON API
The application fetches data from a local JSON API located in the public folder (public/Data.json). Ensure this file is present for the application to work correctly.

#### React Router
The application uses React Router v6 for navigation. It includes a main display page and an analytics page.

**Adding Routes**
Install React Router

Using npm:

```bash
npm install react-router-dom
```

#### Additional Notes
Modal Library: This project uses react-modal for displaying modals. Make sure to set the root element with Modal.setAppElement('#root').
Context: The application uses React Context API to manage click counts.

#### License
This project is licensed under the MIT License. See the LICENSE file for more details.

#### Acknowledgements
[React](https://reactjs.org/)
[TypeScript](https://www.typescriptlang.org/)
[Vite](https://vitejs.dev/)