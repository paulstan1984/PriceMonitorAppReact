// db.ts
import Dexie, { Table } from 'dexie';
import { Price } from './models/Price';
import { Product } from './models/Product';

export const dbName: string = 'PriceAppDatabase';

export class AppDatabaseDexie extends Dexie {

    products!: Table<Product>;
    prices!: Table<Price>;
    
    constructor() {
        super(dbName);
        
        this.version(1).stores({
            products: '++id, name',
            prices: '++id, product_id,created_at',
        });

        this.version(2).stores({
            products: '++id, name',
            prices: '++id, product_id,created_at',
        });
    }

    async deleteDatabase() {
        await Dexie.delete(dbName);
        await this.open();
    }
}

export const appDatabase = new AppDatabaseDexie();

