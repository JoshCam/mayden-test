import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  itemName: string;

  @IsNotEmpty()
  @IsNumber()
  itemPrice: number;

  @IsNotEmpty()
  @IsNumber()
  itemQuantity: number;
}
