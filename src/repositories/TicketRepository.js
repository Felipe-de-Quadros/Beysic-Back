"use strict";
// const {EntityRepository, Repository} = require('typeorm')
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRepository = void 0;
// @EntityRepository
//todo adicionar typeORM e entities
class TicketRepository {
    constructor() {
        this.tickets = [
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
        return this.tickets;
    }
    getById(id) {
        return this.tickets.find(ticket => ticket.id === id);
    }
    create(ticketData) {
        const newTicket = Object.assign({ id: this.tickets.length + 1 }, ticketData);
        this.tickets.push(newTicket);
        return newTicket;
    }
    update(id, ticketData) {
        const ticketIndex = this.tickets.findIndex(ticket => ticket.id === id);
        if (ticketIndex > -1) {
            this.tickets[ticketIndex] = Object.assign({ id }, ticketData);
            return this.tickets[ticketIndex];
        }
        return null;
    }
    delete(id) {
        const ticketIndex = this.tickets.findIndex(ticket => ticket.id === id);
        if (ticketIndex > -1) {
            return this.tickets.splice(ticketIndex, 1);
        }
        return null;
    }
}
exports.TicketRepository = TicketRepository;
