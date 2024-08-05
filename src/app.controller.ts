import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}

  @Get()
  getHello(): string {
    const apiPort = this.configService.get<string>('API_PORT');
    const myEnvName = this.configService.get<string>('MY_ENV_NAME');
    return `Hello, World! API is running on port: ${apiPort} in ${myEnvName} mode.`;
  }
}
