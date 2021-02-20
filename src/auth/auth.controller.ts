import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from './get-user.decorator';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('/signup')
    signUp(
        @Body(ValidationPipe) authCredentialDto: AuthCredentialDto
    ) {
        return this.authService.signUp(authCredentialDto);
    }
    
    @Post('/signin')
    signIn(
        @Body(ValidationPipe) authCredentialDto: AuthCredentialDto
    ) {
        return this.authService.signIn(authCredentialDto);
    }
    
}
