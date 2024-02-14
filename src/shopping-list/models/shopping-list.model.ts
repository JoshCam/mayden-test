import { Injectable } from '@nestjs/common';
import { Column, Table, Model } from 'sequelize-typescript';

/**
 * Model of shopping list table in sqlite
 */
@Injectable()
@Table({
  tableName: 'shopping-list',
})
export class ShoppingList extends Model {
  @Column
  itemName: string;

  @Column
  itemPrice: number;

  @Column
  itemQuantity: number;

  @Column
  purchased: boolean;
}
