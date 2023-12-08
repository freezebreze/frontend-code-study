// class OrderManager {
//     constructor() {
//         this.orders = []
//     }

//     placeOrder(order, id) {
//         this.orders.push(id)
//         return `You have successfully ordered ${order} (${id})`;
//     }

//     trackOrder(id) {
//         return `Your order ${id} will arrive in 20 minutes.`
//     }

//     cancelOrder(id) {
//         this.orders = this.orders.filter(order => order.id !== id)
//         return `You have canceled your order ${id}`
//     }
// }
//拆分 把方法和类拆分开来  命令模式
class OrderManager {
    constructor() {
        this.orders = []
    }
    //执行传进来的方法方法
    execute(command, ...args) {
        return command.execute(this.orders, ...args)
    }
}

class Command {
    //保存了具体的命令 也就是函数
    constructor(execute) {
        this.execute = execute;
    }
}

function PlaceOrderCommand(order, id) {
    return new Command(orders => {
        orders.push(id);
        console.log(`You have successfully ordered ${order} (${id})`);
    });
}

function CancelOrderCommand(id) {
    return new Command(orders => {
        orders = orders.filter(order => order.id !== id);
        console.log(`You have canceled your order ${id}`);
    });
}

function TrackOrderCommand(id) {
    return new Command(() =>
        console.log(`Your order ${id} will arrive in 20 minutes.`)
    );
}

const manager = new OrderManager();
manager.execute(new PlaceOrderCommand('rs', 123))