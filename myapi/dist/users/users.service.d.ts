import { Knex } from 'nestjs-knex';
export declare class UsersService {
    private readonly knex;
    constructor(knex: Knex);
    checkLogin(data: any): Promise<any>;
}
