// const {EntityRepository, Repository} = require('typeorm')

// @EntityRepository
//todo adicionar typeORM e entities
export class UserRepository {
    private users = [
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
      return this.users;
    }
    public getById(id: number) {
      return this.users.find(user => user.id === id);
    }

    public create( userData: any) {
      const newUser = { id: this.users.length + 1, ...userData };
      this.users.push(newUser);
      return newUser;
    }
  
    public update(id: number, UserData: any) {
      const userIndex = this.users.findIndex(user => user.id === id);
      if  (userIndex > -1) {
        this.users[userIndex] = { id, ...UserData };
        return this.users[userIndex];
      }
      return null;
    }
  
    public delete(id: number) {
      const userIndex = this.users.findIndex(user => user.id === id);
      if (userIndex > -1) {
        return this.users.splice(userIndex, 1);
      }
      return null;
    }
  }