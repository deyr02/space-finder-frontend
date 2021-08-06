import { User, UserAttribute } from "../model/Model";

export class AuthService{
    public async login(userName:string, password:string):Promise<User | undefined>{
        if(userName ==='user' && password === '1234'){
            return{
                userName:userName,
                email: 'some@email.com'
            }
        }
    }

    public async getUserAttributes (user:User):Promise<UserAttribute[]|undefined>{

        const result:UserAttribute[] = [];
        result.push({
            Name: "description",
            Value:"Best User ever!"
        });
        result.push({
            Name: "job",
            Value:"Engineer"
        });
        result.push({
            Name: "age",
            Value:"25"
        });
        result.push({
            Name: "experience",
            Value:"3 Years"
        });
        return result;
    }
}