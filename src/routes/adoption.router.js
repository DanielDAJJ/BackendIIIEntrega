import { Router} from 'express';
import adoptionsController from '../controllers/adoptions.controller.js';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Endpoints relacionados con las adopciones de mascotas
*/

/**
 * @swagger
 * /adoptions:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: Lista de adopciones obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       owner:
 *                         type: string
 *                         description: ID del usuario adoptante
 *                       pet:
 *                         type: string
 *                         description: ID de la mascota adoptada
 */
router.get('/',adoptionsController.getAllAdoptions);

/**
 * @swagger
 * /adoptions/{aid}:
 *   get:
 *     summary: Obtener una adopción por ID
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la adopción
 *     responses:
 *       200:
 *         description: Adopción encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     owner:
 *                       type: string
 *                     pet:
 *                       type: string
 *       404:
 *         description: Adopción no encontrada
 */
router.get('/:aid',adoptionsController.getAdoption);

/**
 * @swagger
 * /adoptions/{uid}/{pid}:
 *   post:
 *     summary: Crear una nueva adopción
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario que adopta
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota a adoptar
 *     responses:
 *       200:
 *         description: Adopción realizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Pet adopted
 *       400:
 *         description: Mascota ya adoptada o datos incompletos
 *       404:
 *         description: Usuario o mascota no encontrados
 */
router.post('/:uid/:pid',adoptionsController.createAdoption);

export default router;