import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export function generateMockUsers(count = 1){
    const users = [];
    for (let i = 0; i< count; i++){
        users.push({
            _id: faker.database.mongodbObjectId(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync('coder23',10),
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: []
        });
    }
    return users;
}