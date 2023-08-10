import { Knex } from 'nestjs-knex';
export declare class AppService {
    private readonly knex;
    constructor(knex: Knex);
    getHello(): string;
    template: any;
    insUser(data: any): Promise<any>;
    delUser(data: any): Promise<any>;
    updateUser(data: any, dataCondition: any): Promise<any>;
}
