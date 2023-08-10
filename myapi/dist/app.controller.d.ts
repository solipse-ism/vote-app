import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    ins(body: any): string;
    Delete(param: any): string;
    Put(body: any, param: any): string;
    up(body: any): string;
}
