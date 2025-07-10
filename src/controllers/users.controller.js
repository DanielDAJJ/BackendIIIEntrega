import { usersService } from "../services/index.js"

const getAllUsers = async(req,res)=>{
    try {
        const users = await usersService.getAll();
        req.logger.info("Users fetched successfully");
        res.send({status:"success",payload:users})
    } catch (error) {
        req.logger.error(`Error fetching users: ${error.message}`);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
}

const getUser = async(req,res)=> {
    try {
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if(!user) return res.status(404).send({status:"error",error:"User not found"})
        req.logger.info(`User ${userId} fetched`);
        res.send({status:"success",payload:user})
    } catch (error) {
        req.logger.error(`Error getting user: ${error.message}`);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
}

const updateUser =async(req,res)=>{
    try {
        const updateBody = req.body;
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if(!user) return res.status(404).send({status:"error", error:"User not found"})
        const result = await usersService.update(userId,updateBody);
        req.logger.info(`User ${userId} updated`);
        res.send({status:"success",message:"User updated"})
    } catch (error) {
        req.logger.error(`Error updating user: ${error.message}`);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
}

const uploadDocuments = async (req, res) => {
    const {uid} = req.params;
    const user = await usersService.getUserById(uid);

    if(!user) return res.status(400).send({status: 'error', error: 'Usuario no encontrado'});
    if(!req.files || req.files.length === 0){
        return res.status(400).send({status: 'error', error:'No se han cargado archivos'});
    }

    const docs = req.files.map(file =>({
        name: file.originalname,
        reference: `${req.protocol}://${req.get('host')}/documents/${file.filename}`
    }));

    user.documents.push(...docs);
    await usersService.update(user._id, {documents: user.documents});

    req.logger.info(`Documentos cargados para user ${uid}`);
    res.send({status:' succes', message: 'Documentos cargados', payload: docs});
}

const deleteUser = async(req,res) =>{
    try {
        const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(400).send({status:'error', error: 'Usuario no ha encontrado'});

    await usersService.delete(userId);
    req.logger.info(`User ${userId} deleted`);
    res.send({status:"success",message:"User deleted"})
    } catch (error) {
        req.logger.error(`Error deleting user: ${error.message}`);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
}

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    uploadDocuments
}