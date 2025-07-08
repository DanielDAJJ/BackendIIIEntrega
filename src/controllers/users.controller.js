import { usersService } from "../services/index.js"

const getAllUsers = async(req,res)=>{
    const users = await usersService.getAll();
    res.send({status:"success",payload:users})
}

const getUser = async(req,res)=> {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error",error:"User not found"})
    res.send({status:"success",payload:user})
}

const updateUser =async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error", error:"User not found"})
    const result = await usersService.update(userId,updateBody);
    res.send({status:"success",message:"User updated"})
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

    res.send({status:' succes', message: 'Documentos cargados', payload: docs});
}

const deleteUser = async(req,res) =>{
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(400).send({status:'error', error: 'Usuario no ha encontrado'});

    await usersService.delete(userId);
    res.send({status:"success",message:"User deleted"})
}

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    uploadDocuments
}