# Venice AI Multi-Chat

A web application that allows you to send prompts to multiple Venice AI models simultaneously and compare their responses side by side.

## Features

- Send prompts to multiple Venice AI models at the same time
- Compare responses from different models side by side
- Customize settings for each model (temperature, max tokens, web search)
- Clean, modern UI with responsive design
- Markdown rendering for responses

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd venice-multi-chat
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Select models from the left panel
2. Configure model settings (optional)
3. Enter your prompt in the input field
4. Click "Send" to get responses from all selected models
5. View and compare the responses in the grid

## API Key

The application uses a Venice AI API key for authentication. The key is hardcoded in the application for demonstration purposes.

## Technologies Used

- React
- TypeScript
- Material-UI
- Venice AI API 