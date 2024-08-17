// const {EntityRepository, Repository} = require('typeorm')

// @EntityRepository
//todo adicionar typeORM e entities
export class TicketRepository {
  private tickets = [
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

  public getAll(){
    return this.tickets;
  }
  public getById(id: number) {
    return this.tickets.find(ticket => ticket.id === id);
  }

  public create(ticketData: any) {
    const newTicket = { id: this.tickets.length + 1, ...ticketData };
    this.tickets.push(newTicket);
    return newTicket;
  }

  public update(id: number, ticketData: any) {
    const ticketIndex = this.tickets.findIndex(ticket => ticket.id === id);
    if (ticketIndex > -1) {
      this.tickets[ticketIndex] = { id, ...ticketData };
      return this.tickets[ticketIndex];
    }
    return null;
  }

  public delete(id: number) {
    const ticketIndex = this.tickets.findIndex(ticket => ticket.id === id);
    if (ticketIndex > -1) {
      return this.tickets.splice(ticketIndex, 1);
    }
    return null;
  }
}