import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  orders = [];

  create(order: OrderDto) {
    this.orders.push(order);
    return order;
  }
}
