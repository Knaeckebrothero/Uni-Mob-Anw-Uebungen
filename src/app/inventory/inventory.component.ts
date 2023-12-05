import { Component, OnInit } from '@angular/core';
import { InventoryDbService } from './inventory-db.service';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import './inventory-transaction-interface';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  userMoney: number = 0;
  orderForm!: FormGroup;
  displayedColumns: string[] = ['id', 'description', 'date', 'category', 'amount', 'price'];
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this.transactionsSubject.asObservable();
  
  constructor(private dDbService: InventoryDbService) {}

  ngOnInit(): void {
    this.loadUserMoney();
    this.loadTransactions();
    this.orderForm = new FormGroup({
      category: new FormControl(''),
      description: new FormControl(''),
      amount: new FormControl(0),
      price: new FormControl(0)
  });
  this.waitForDbInitialization();
  }

  private waitForDbInitialization() {
    this.dDbService.isDbInitialized().subscribe(initialized => {
      if (initialized) {
        this.loadTransactions();
      }
    });
  }
  
  private initializeForm() {
    this.orderForm = new FormGroup({
      // ... form controls
    });
  }

  loadUserMoney() {
    // Check if money is already saved in localStorage
    const savedMoney = localStorage.getItem('userMoney');
    if (savedMoney) {
        this.userMoney = parseInt(savedMoney);
    } else {
        // If not present, initialize with 1000
        this.userMoney = 1000;
        localStorage.setItem('userMoney', this.userMoney.toString());
    }
  }

  updateUserMoney(newAmount: number) {
      // Update the money count
      this.userMoney = newAmount;
      // Save the updated count to localStorage
      localStorage.setItem('userMoney', this.userMoney.toString());
  }

  /*
  async loadTransactions() {
    // this.transactions = await this.dDbService.getAllTransactions();
    this.dDbService.getAllTransactions().then(txs => {
      this.transactions = txs;
    });
  }
  */

  loadTransactions() {
    this.dDbService.getAllTransactions().then(txs => {
      this.transactionsSubject.next(txs);
    });
  } 

  async addTransaction(transaction: Transaction) {
    await this.dDbService.addTransaction(transaction);
    // Reload transactions to update the view
    this.loadTransactions();
  }

  submitOrder() {
    const transaction = this.orderForm.value;
    transaction.date = new Date(); // Set the current date
    transaction.id = Date.now(); // Simple ID generation, consider a better approach for a real app
    this.dDbService.addTransaction(transaction).then(() => {
        this.userMoney -= transaction.amount * transaction.price; // Subtract money
        localStorage.setItem('userMoney', this.userMoney.toString()); // Save new money count
        this.orderForm.reset(); // Reset form after submission
    });

    // Update user's money
    this.userMoney -= transaction.amount * transaction.price;
    localStorage.setItem('userMoney', this.userMoney.toString());

    // Reload transactions to update the table
    this.loadTransactions();
  }
}
