import { Module } from '@nestjs/common';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { dataBaseConfig } from './database/database.config';

@Module({
  imports: [ShoppingListModule, SequelizeModule.forRoot(dataBaseConfig)],
})
export class AppModule {}
