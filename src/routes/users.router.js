import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import uploader from '../utils/uploader.js';

const router = Router();

router.get('/',usersController.getAllUsers);
router.get('/:uid',usersController.getUser);
router.post('/:uid/documents', uploader.array('userDocument', 5), usersController.uploadDocuments);
router.put('/:uid',usersController.updateUser);
router.delete('/:uid',usersController.deleteUser);


export default router;