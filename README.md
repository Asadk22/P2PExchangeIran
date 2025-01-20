# Iran P2P Exchange Platform

A secure peer-to-peer trading platform built with Next.js, TypeScript, and WebSocket for real-time communication.

## Features

- Real-time chat with WebSocket integration
- Secure authentication and authorization
- Trade management system
- Automated backup system
- Dispute resolution
- User notifications
- Responsive UI with modern design

## Tech Stack

- Next.js 13+ with App Router
- TypeScript
- Socket.IO for real-time communication
- MongoDB for data storage
- NextAuth.js for authentication
- TailwindCSS for styling
- ShadcnUI for UI components

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
cd iran-p2p-exchange
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Run the development server
```bash
npm run dev
```

## Project Structure

```
├── src/
│   ├── app/              # Next.js 13 app directory
│   ├── components/       # React components
│   ├── lib/             # Utility functions and shared logic
│   └── styles/          # Global styles
├── public/              # Static assets
├── scripts/            # Utility scripts including backup
└── backup/            # Automated backups
```

## Backup System

The project includes an automated backup system:

1. Regular backups are stored in the `/backup` directory
2. Each backup includes:
   - Full codebase snapshot
   - Git status and diff
   - Timestamp and commit information

To create a backup manually:
```bash
./scripts/backup.sh
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

[MIT License](LICENSE)
# P2PExchange
