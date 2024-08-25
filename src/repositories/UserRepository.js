"use strict";
// const {EntityRepository, Repository} = require('typeorm')
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
// @EntityRepository
//todo adicionar typeORM e entities
class UserRepository {
    constructor() {
        this.users = [
            {
                id: 1,
                eventName: "Computaria",
                categories: ["pista", "camarote", "vip"],
                place: "Veld",
                city: "Erechim",
                state: "RS"
            },
            {
                id: 2,
                eventName: "Patologicos",
                categories: ["pista", "camarote", "vip"],
                place: "Bocato",
                city: "Erechim",
                state: "RS"
            }
        ];
    }
    getAll() {
        return this.users;
    }
    getById(id) {
        return this.users.find(user => user.id === id);
    }
    create(userData) {
        const newUser = Object.assign({ id: this.users.length + 1 }, userData);
        this.users.push(newUser);
        return newUser;
    }
    update(id, UserData) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex > -1) {
            this.users[userIndex] = Object.assign({ id }, UserData);
            return this.users[userIndex];
        }
        return null;
    }
    delete(id) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex > -1) {
            return this.users.splice(userIndex, 1);
        }
        return null;
    }
}
exports.UserRepository = UserRepository;
