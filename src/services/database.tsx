// db.ts
import Dexie, { Table } from 'dexie';
import { Price } from './models/Price';
import { Product } from './models/Product';


export class AppDatabaseDexie extends Dexie {

    products!: Table<Product>;
    prices!: Table<Price>;

    constructor() {
        super('PriceAppDatabase');
        this.version(1).stores({
            products: '++id, name',
            prices: '++id, product_id',
        });
    }
}

export const appDatabase = new AppDatabaseDexie();

