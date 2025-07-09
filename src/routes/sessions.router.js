import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Endpoints para gestión de sesión de los usuarios
*/

/**
 * @swagger
 * /sessions/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: string
 *                   example: 64a7fe2e237c68b1a68e9cf2
 *       400:
 *         description: Datos incompletos o usuario ya existente
 */
router.post('/register',sessionsController.register);

/**
 * @swagger
 * /sessions/login:
 *   post:
 *     summary: Iniciar sesión con protección JWT
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
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
 *                   example: Logged in
 *       400:
 *         description: Datos incorrectos o incompletos
 */
router.post('/login',sessionsController.login);

/**
 * @swagger
 * /sessions/logout:
 *   post:
 *     summary: Cerrar sesión del usuario autenticado
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Logout exitoso
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
 *                   example: Sesión cerrada correctamente
 */
router.post('/logout', sessionsController.logout);

/**
 * @swagger
 * /sessions/current:
 *   get:
 *     summary: Obtener datos del usuario autenticado con JWT
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Usuario autenticado obtenido correctamente
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
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *                     email:
 *                       type: string
 *       403:
 *         description: No autorizado
 */
router.get('/current',sessionsController.current);

/**
 * @swagger
 * /sessions/unprotectedLogin:
 *   get:
 *     summary: Login sin validación (técnico)
 *     tags: [Sessions]
 *     parameters:
 *       - name: email
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: password
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Login técnico exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Datos inválidos
 */
router.get('/unprotectedLogin',sessionsController.unprotectedLogin);

/**
 * @swagger
 * /sessions/unprotectedCurrent:
 *   get:
 *     summary: Obtener datos del usuario sin validación
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Usuario obtenido sin validación
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
 *                     first_name:
 *                       type: string
 *                     last_name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       403:
 *         description: No autorizado
 */
router.get('/unprotectedCurrent',sessionsController.unprotectedCurrent);

export default router;