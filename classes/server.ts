import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from  '../sockets/socket';

export default class Server {
    // Singleton
    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: SocketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.listenSockets();
    }

    // Singleton
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private listenSockets() {
        console.log('Escuchando - sockets');

        this.io.on('connection', cliente => {
            // Conectar cliente
            socket.conectarCliente(cliente);

            // Configurar usuario
            socket.configurarUsuario(cliente, this.io);

            // Metodo mensaje
            socket.mensaje(cliente, this.io);

            // Desconectar
            socket.desconectar(cliente);

        });
    }

    start(callback: Function) {
        this.httpServer.listen(this.port, callback());
    }
}