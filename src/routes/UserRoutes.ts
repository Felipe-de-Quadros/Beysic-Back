import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'user',
        module:UserRoutesModule,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserRoutesModule {
    
}