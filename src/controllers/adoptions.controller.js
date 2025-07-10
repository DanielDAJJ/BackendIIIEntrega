import { adoptionsService, petsService, usersService } from "../services/index.js"

const getAllAdoptions = async(req,res)=>{
    try {
        const result = await adoptionsService.getAll();
        req.logger.info("Adoptions fetched successfully");
        res.send({status:"success",payload:result});
    } catch (error) {
        req.logger.error(`Error getting adoptions: ${err.message}`);
        res.status(500).send({ status: "error", error: "Internal server error" })
    }
}

const getAdoption = async(req,res)=>{
    try {
        const adoptionId = req.params.aid;
        const adoption = await adoptionsService.getBy({_id:adoptionId})
        if(!adoption){
            req.logger.warning(`Adoption not found: ${adoptionId}`);
            return res.status(404).send({status:"error",error:"Adoption not found"});
        }
        req.logger.info(`Adoption found: ${adoptionId}`);
        res.send({status:"success",payload:adoption})
    } catch (error) {
        req.logger.error(`Error getting adoption: ${err.message}`);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
}

const createAdoption = async(req,res)=>{
    try {
        const {uid,pid} = req.params;
    const user = await usersService.getUserById(uid);
    if(!user) return res.status(404).send({status:"error", error:"user Not found"});
    const pet = await petsService.getBy({_id:pid});
    if(!pet) return res.status(404).send({status:"error",error:"Pet not found"});
    if(pet.adopted) return res.status(400).send({status:"error",error:"Pet is already adopted"});
    user.pets.push(pet._id);
    await usersService.update(user._id,{pets:user.pets})
    await petsService.update(pet._id,{adopted:true,owner:user._id})
    await adoptionsService.create({owner:user._id,pet:pet._id});
    req.logger.info(`Adoption created: user ${uid} adopted pet ${pid}`);
    res.send({status:"success",message:"Pet adopted"})
    } catch (error) {
        req.logger.error(`Error creating adoption: ${err.message}`);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
}

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
}