import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('notification')
export class NotificationController {
  @EventPattern('order_created')
  async handleOrderCreated(data: Record<string, unknown>) {
    console.log('Order created!', data);
  }
}
