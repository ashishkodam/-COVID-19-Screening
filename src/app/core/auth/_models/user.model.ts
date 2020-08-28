import { BaseModel } from '../../_base/crud';

export class User extends BaseModel {
    id: number;
    username: string;
    password: string;
    email: string;
    roles: string;
    firstname: string;
    lastname:string

    clear(): void {
        this.id = undefined;
        this.username = '';
        this.password = '';
        this.email = '';
        this.roles = '';
        this.firstname ='';
        this.lastname ='';
    }
}
