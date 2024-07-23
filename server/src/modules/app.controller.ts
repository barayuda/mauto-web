import { Controller, Get } from '@nestjs/common'

@Controller()
export class MainController {
    @Get()
    getInfo(): string {
        return 'M-Auto Boilerplate by Barayuda v1'
    }
}
