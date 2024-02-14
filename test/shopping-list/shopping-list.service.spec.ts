import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingListService } from '../../src/shopping-list/shopping-list.service';
import { ShoppingList } from '../../src/shopping-list/models/shopping-list.model';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';

describe('ShoppingListService', () => {
  let service: ShoppingListService;
  let repository: typeof ShoppingList;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: 'sqlite',
          database: ':memory:',
          autoLoadModels: true,
          synchronize: true,
          logging: false,
          models: [ShoppingList],
        }),
      ],
      providers: [
        ShoppingListService,
        {
          provide: getModelToken(ShoppingList),
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ShoppingListService>(ShoppingListService);
    repository = module.get<typeof ShoppingList>(getModelToken(ShoppingList));
  });

  afterEach(() => jest.resetAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getItemsOnList()', () => {
    it('should return an empty array if no items in cart', async () => {
      const result = await service.getItemsOnList();
      expect(result).toStrictEqual(undefined);
      expect(repository.findAll).toBeCalledTimes(1);
    });
  });
});
