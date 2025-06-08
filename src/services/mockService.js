import { generateMockUsers } from "../utils/mockUsers.js";
import { generateMockPets } from "../utils/mockPets.js";
import Users from "../dao/models/User.js";
import Pets from "../dao/models/Pet.js";

export async function insertMockData(userCount, petCount){
    const users = generateMockUsers(userCount);
    const pets = generateMockPets(petCount);

    try{
        await Users.insertMany(users);
        await Pets.insertMany(pets);
    } catch(error){
        throw new Error(`Error inserting mock data: ${error.message}`);
    }
}