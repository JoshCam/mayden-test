import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingList } from './models/shopping-list.model';
import { CreateItemDto } from 'src/dtos/createItemDTO.dto';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectModel(ShoppingList)
    private shoppingListRepository: typeof ShoppingList,
  ) {}

  /**
   * Return all items in shopping list
   * @returns All items in shopping list
   */
  async getItemsOnList(): Promise<ShoppingList[] | []> {
    return await this.shoppingListRepository.findAll();
  }

  /**
   * Create or update item
   * @param createCartItem Item to create or if exists, update
   * @returns copy of item created or updated
   */
  async upsertItemToList(createCartItem: CreateItemDto): Promise<ShoppingList> {
    const item = await this.shoppingListRepository.findOne({
      where: {
        itemName: createCartItem.itemName,
      },
    });
    //   Convert to plain object
    const itemToSave: Record<string, any> = createCartItem;

    //   If item found then update item quantity so no duplicates
    if (item) {
      let itemQuantity = Number(item.itemQuantity);
      return item.update({
        ...item,
        itemQuantity: (itemQuantity += Number(itemToSave.itemQuantity)),
      });
    } else {
      // else create new item
      return this.shoppingListRepository.create(itemToSave);
    }
  }

  /**
   * decrement item by quantity of 1 or if < 1, remove item.
   * @param itemId
   * @returns updated item with new quantity or msg stating item deleted
   */
  async removeItem(
    itemId: number,
  ): Promise<ShoppingList | { message: string }> {
    // attempt to find item
    const item = await this.shoppingListRepository.findOne({
      where: { id: itemId },
    });

    // If item exists and quantity > 1 then remove 1
    if (item && Number(item.itemQuantity) > 1) {
      let currentQuantity = Number(item.itemQuantity);
      return item.update({ itemQuantity: (currentQuantity -= 1) });
    } else {
      // else remove item from list all together
      item.destroy();
      return { message: 'item quantity fell below 1, removed from list' };
    }
  }

  /**
   * updates 'purchased' field to true if item exists
   * @param itemId Id of item to mark as purchased
   * @returns
   */
  async markAsPurchased(itemId: number): Promise<{ message: String }> {
    const isUpdated = await this.shoppingListRepository.update(
      { purchased: true },
      { where: { id: itemId } },
    );
    return isUpdated
      ? { message: `Item with id${itemId} marked as purchased` }
      : { message: `could not find item with id${itemId}` };
  }
}
