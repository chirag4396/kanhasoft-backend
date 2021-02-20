import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/entities/user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }
    
    async signUp(authCredentialDto: AuthCredentialDto) {
        // return authCredentialDto;
        return this.userRepository.signUp(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialDto) {
        const username = await this.userRepository.validateUserPassord(authCredentialDto);
        
        if (!username) {
            throw new UnauthorizedException('Invalide credentials');
        }

        const payload: JwtPayload= {
            username
        };

        const accessToken = await this.jwtService.sign(payload);

        return {
            accessToken
        };

    }
}
