import { Router, Request, Express } from 'express';

const router = Router();

router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'GET esta bien !'
    });
});

router.post('/mensajes', (req, res) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

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

    res.json({
        ok: true,
        mensaje: 'POST esta bien !',
        cuerpo,
        de,
        id
    });
});

export default router;