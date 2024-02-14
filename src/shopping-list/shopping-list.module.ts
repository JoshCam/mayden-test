import { Module } from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListController } from './shopping-list.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShoppingList } from './models/shopping-list.model';

@Module({
  imports: [SequelizeModule.forFeature([ShoppingList])],
  controllers: [ShoppingListController],
  providers: [ShoppingListService],
})
export class ShoppingListModule {}
