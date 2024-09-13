import { Controller, Get,Post  } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getSite(): string {
    return this.appService.getSite();
  }

  @Post()
  emailParkingSpots(): string {
    return this.appService.emailParkingSpots();
  }

}
