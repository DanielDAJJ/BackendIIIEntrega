import { Router } from "express";
import { generateMockPets } from '../utils/mockPets.js';
import { generateMockUsers } from '../utils/mockUsers.js';
import { insertMockData } from '../services/mockService.js';

const router = Router();

router.get('/mockingpets', (req, res)=>{
    const pets = generateMockPets(25)
    res.json(pets);
});
router.get('/mockingusers',(req, res)=>{
    const users = generateMockUsers(25)
    res.json(users);
});
router.post('/generateData', async (req, res)=>{
    const {users = 10, pets = 10} =  req.body;
    try {
        await insertMockData(users, pets);
        res.json({
            message: 'Mock data generated successfully',
            inserted:{
                users,
                pets
            }
        });
    } catch (error) {
        console.error('Error generating mock data:', error);
        res.status(500).json({ error: 'Failed to generate mock data' });
    }
});

export default router;