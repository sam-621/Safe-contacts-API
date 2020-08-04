import { Server } from './App';
import { port } from './config';

function main() {
    const server = new Server(port);
    
    server.StartServer();
}

main();