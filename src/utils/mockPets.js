import {faker} from "@faker-js/faker";

export function generateMockPets(count = 1) {
    const pets = [];
    for(let i = 0; i < count; i++){
        pets.push({
            _id: faker.database.mongodbObjectId(),
            name: faker.animal.petName(),
            species: faker.animal.type(),
            age: faker.number.int({ min: 0, max: 20 }),
        })
    }
    return pets;
}