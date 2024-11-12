import { IsString, IsArray, IsNumber, IsDecimal, IsOptional, IsInt, Length } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @Length(1, 255)
  eventName!: string;

  @IsString()
  categories!: string;

  @IsString()
  @Length(1, 255)
  place!: string;

  @IsString()
  @Length(1, 255)
  city!: string;

  @IsString()
  @Length(2, 2)
  state!: string;

  @IsDecimal()
  price!: number;

  @IsInt()
  availableQuantity!: number;

  @IsOptional()
  userId?: number;
}
