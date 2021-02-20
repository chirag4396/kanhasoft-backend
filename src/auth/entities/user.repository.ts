import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { AuthCredentialDto } from "src/auth/dto/auth-credential.dto";
import { EntityRepository, Repository } from "typeorm"
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository < User > {
    

    async signUp(authCredentialDto: AuthCredentialDto) {
        const { username, password } = authCredentialDto;
        // return await bcrypt.genSalt();
        const user = new User();
        user.username = username;
        // user.salt = await bcrypt.genSalt();
        // user.password = await this.hashPassword(password, user.salt);
        user.password = password;
        
        try {            
            await user.save();
        }catch(err){
            if (err.code == "23505") {
                throw new ConflictException('Username already exists');
            } else {                
                throw new InternalServerErrorException();
            }
        }
    }

    // private async hashPassword(password: string, salt: string): Promise<string> {
    //     return bcrypt.hash(password, salt);
    // }

    async validateUserPassord(authCredentialDto: AuthCredentialDto): Promise<any>{

        const {
            username, password
        } = authCredentialDto;

        const user = await this.findOne({ username, password });
        // if (user && await user.validatePassword(password)) {
        if (user) {
            return user.username;
        } else {
            return null;
        }
    }
}