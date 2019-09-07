import { Socket } from 'socket.io';

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado')
    });
}

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido: ', payload);

        io.emit('mensaje-nuevo', payload);
    });
}

// Configurar usuario
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {
        console.log('Configurando usuario: ', payload.nombre);

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado.`
        });
        // io.emit('mensaje-nuevo', payload);
    });
}