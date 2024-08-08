// const {EntityRepository, Repository} = require('typeorm')

// @EntityRepository
//todo adicionar typeORM e entities
export class TicketRepository {
  public static getAll(){
    return [
      {
        id : 1,
        eventName : "Computaria",
        categories : ["pista", "camarote", "vip"],
        place : "Veld",
        city : "Erechim",
        state : "RS"
      },
      {
        id : 2,
        eventName : "Patologicos",
        categories : ["pista", "camarote", "vip"],
        place : "Bocato",
        city : "Erechim",
        state : "RS"
      }
    ]
  }
}