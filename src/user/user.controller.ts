import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/register")
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    const newUser = this.userService.create(createUserDto);
    if (!newUser){
      throw new BadRequestException('User could not be created!');
    }
    return { 'status' : 'success', 'message' : 'User created successfully!' };
  }

  @Get()
  findAll() {
    return this.userService.get();
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: any) {
    const userId = req.user.id;
    const user = await this.userService.getById(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isProducer: user.isProducer,
      tickets: user.tickets,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}