import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt, { decode } from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
        const exists = await usersService.getUserByEmail(email);
        if (exists) return res.status(400).send({ status: "error", error: "User already exists" });
        const hashedPassword = await createHash(password);
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword
        }
        let result = await usersService.create(user);
        console.log(result);
        req.logger.info(`Registered user: ${email}`);
        res.send({ status: "success", payload: result._id });
    } catch (error) {
        req.logger.error(`Registration error: ${error.message}`);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
        const user = await usersService.getUserByEmail(email);
        if(!user) return res.status(404).send({status:"error",error:"User doesn't exist"});
        const isValidPassword = await passwordValidation(user,password);
        if(!isValidPassword) return res.status(400).send({status:"error",error:"Incorrect password"});

        user.last_connection = new Date();
        await usersService.update(user._id, user);
        console.log(`Usuario ${user.email} inicio sesion a las ${user.last_connection.toLocaleString()}`);

        const userDto = UserDTO.getUserTokenFrom(user);
        const token = jwt.sign(userDto,'tokenSecretJWT',{expiresIn:"1h"});
        req.logger.info(`Login success: ${email}`);
        res.cookie('coderCookie',token,{maxAge:3600000}).send({status:"success",message:"Logged in"})
    } catch (error) {
        req.logger.error(`Login error: ${error.message}`);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
}

const logout = async (req, res) => {
    try {
        const cookie = req.cookies['coderCookie'];
        if(!cookie) return res.status(400).send({status: 'error', error: 'No se encontro sesion iniciada'}); 

        const decoded = jwt.verify(cookie, 'tokenSecretJWT');
        const user = await usersService.getUserByEmail(decoded.email);
        if(!user) return res.status(404).send({status: 'error', error: 'Usuario no encontrado'});

        user.last_connection = new Date();
        await usersService.update(user._id, user);
        console.log(`Usuario ${user.email} cerró sesion a las ${user.last_connection.toLocaleString()}`);

        res.clearCookie('coderCookie');
        req.logger.info(`Logout success${email}`);
        res.send({status: 'succes', message: 'Logged out succesfullu'});
    } catch (error) {
        req.logger.error(`Logout error: ${error.message}`);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
}

const current = async(req,res) =>{
    const cookie = req.cookies['coderCookie']
    const user = jwt.verify(cookie,'tokenSecretJWT');
    if(user)
        return res.send({status:"success",payload:user})
}

const unprotectedLogin  = async(req,res) =>{
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const user = await usersService.getUserByEmail(email);
    if(!user) return res.status(404).send({status:"error",error:"User doesn't exist"});
    const isValidPassword = await passwordValidation(user,password);
    if(!isValidPassword) return res.status(400).send({status:"error",error:"Incorrect password"});
    const token = jwt.sign(user,'tokenSecretJWT',{expiresIn:"1h"});
    res.cookie('unprotectedCookie',token,{maxAge:3600000}).send({status:"success",message:"Unprotected Logged in"})
}
const unprotectedCurrent = async(req,res)=>{
    const cookie = req.cookies['unprotectedCookie']
    const user = jwt.verify(cookie,'tokenSecretJWT');
    if(user)
        return res.send({status:"success",payload:user})
}
export default {
    current,
    login,
    register,
    current,
    unprotectedLogin,
    unprotectedCurrent,
    logout
}