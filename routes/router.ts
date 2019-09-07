import { Router, Request, Express } from 'express';
import Server from '../classes/server';

const router = Router();
const server = Server.instance;

router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'GET esta bien !'
    });
});

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

export default router;