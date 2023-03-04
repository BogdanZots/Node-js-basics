const EventEmitter = require("events");

interface IConsumer {
  id?: string;
  name: string;
  balance: number;
}

class Bank extends EventEmitter {
  consumers: Array<IConsumer> = [];

  register(data: IConsumer): string {
    const { balance, name } = data;
    const id = Math.random().toString();
    this.consumers.push({ name, id, balance });
    return id;
  }

  changeBankAmomunt(personId, ammount): void {
    const currentCostumer = this.getCurrentCustomer(personId);
    const index = this.consumers.findIndex((entity) => entity.id === personId);
    this.consumers.splice(index, 1, {
      ...this.consumers[index],
      balance: currentCostumer?.balance + ammount,
    });
  }

  getCurrentCustomer(id: string): IConsumer | undefined {
    return this.consumers.find((consumer) => consumer.id === id);
  }
}

const bank = new Bank();

const personId = bank.register({
  name: "Pitter Black",
  balance: 100,
});

bank.on("add", (personId, ammount) => {
  bank.changeBankAmomunt(personId, ammount);
});

bank.emit("add", personId, 20);
bank.emit("add", personId, 120);
