import { Router, Request, Express } from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/socket';

const router = Router();
const server = Server.instance;

// router.get('/mensajes', (req, res) => {
//     res.json({
//         ok: true,
//         mensaje: 'GET esta bien !'
//     });
// });

router.post('/mensajes', (req, res) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }

    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        mensaje: 'POST esta bien !',
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req, res) => {

    
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        mensaje: 'POST esta bien !',
        cuerpo,
        de,
        id
    });
});

// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', (req, res) => {

    server.io.clients((error: any, clientes: string[]) => {
        
        if (error) {
            return res.json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            clientes
        });
    });
});

// Obtener usuario con sus nombres
router.get('/usuarios/detalle', (req, res) => {

    res.json({
        ok: true,
        clientes: usuariosConectados.getListaUsuarios()
    });

});

export default router;