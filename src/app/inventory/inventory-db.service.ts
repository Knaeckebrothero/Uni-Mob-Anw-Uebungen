import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase, DBSchema } from 'idb';
import './inventory-transaction-interface';
import { BehaviorSubject, Observable } from 'rxjs';

interface MyDB extends DBSchema {
  transactions: {
    key: number;
    value: Transaction;
  };
}

@Injectable({
  providedIn: 'root'
})
export class InventoryDbService {
  private db!: IDBPDatabase<MyDB>;
  private dbInitialized = new BehaviorSubject(false);

  constructor() {
    this.initDB().then(() => this.dbInitialized.next(true));
  }

  isDbInitialized(): Observable<boolean> {
    return this.dbInitialized.asObservable();
  }

  async initDB() {
    this.db = await openDB<MyDB>('my-database', 1, {
      upgrade(db) {
        // Create a store of objects
        const store = db.createObjectStore('transactions', {
          // The 'id' property of the object will be the key.
          keyPath: 'id',
          // If it isn't explicitly set, create a value by auto incrementing.
          autoIncrement: true,
        });
      },
    });
  }

  async addTransaction(transaction: Transaction) {
    return this.db.add('transactions', transaction);
  }

  async getAllTransactions() {
    return this.db.getAll('transactions');
  }
}