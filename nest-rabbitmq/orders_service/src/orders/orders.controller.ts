import { Controller, Post, Body, Inject } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './dto/order.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy,
    private readonly ordersService: OrdersService,
  ) {}

  @Post()
  async create(@Body() orderDto: OrderDto): Promise<any> {
    this.client.emit('order_created', orderDto);
    return this.ordersService.create(orderDto);
  }
}
