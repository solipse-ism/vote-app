import { Knex } from 'nestjs-knex';
export declare class UsersService {
    private readonly knex;
    constructor(knex: Knex);
    getUserById(loginId: any): Promise<any>;
    checkLogin(data: any): Promise<any>;
}
