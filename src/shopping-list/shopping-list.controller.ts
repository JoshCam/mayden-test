import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';
import { CreateItemDto } from '../dtos/createItemDto.dto';

@Controller('shopping-list')
export class ShoppingListController {
  constructor(private readonly ShoppingListService: ShoppingListService) {}

  @Get()
  async getItemsOnList() {
    return await this.ShoppingListService.getItemsOnList();
  }

  @Post()
  async upsertItemToList(@Body() createItemDto: CreateItemDto) {
    return await this.ShoppingListService.upsertItemToList(createItemDto);
  }

  @Delete('/:id')
  async removeItem(@Param() Params: any) {
    return await this.ShoppingListService.removeItem(Params.id);
  }

  @Put('/:id')
  async markAsPurchased(@Param() Params: any) {
    return await this.ShoppingListService.markAsPurchased(Params.id);
  }
}
