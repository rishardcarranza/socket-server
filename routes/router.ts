import { Router, Request, Express } from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/socket';
import { GraficaData } from '../classes/grafica';

const router = Router();
const server = Server.instance;

const grafica = new GraficaData();


router.get('/grafica', (req, res) => {
    res.json(
        grafica.getDataGrafica()
    );
});

router.post('/grafica', (req, res) => {

    const mes = req.body.mes;
    const unidades = Number(req.body.unidades);

    grafica.incrementarValor(mes, unidades);
    server.io.emit('cambio-grafica', grafica.getDataGrafica());

    res.json(
        grafica.getDataGrafica()
    );
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