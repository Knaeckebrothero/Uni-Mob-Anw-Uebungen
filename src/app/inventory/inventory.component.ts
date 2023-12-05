import { Component, OnInit } from '@angular/core';
import { InventoryDbService } from './inventory-db.service';
import './inventory-transaction-interface';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  userMoney: number = 0;
  transactions: Transaction[] = [];

  constructor(private dDbService: InventoryDbService) {}

  ngOnInit(): void {
    this.loadUserMoney();
    this.loadTransactions();
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

  async loadTransactions() {
    this.transactions = await this.dDbService.getAllTransactions();
  }

  async addTransaction(transaction: Transaction) {
    await this.dDbService.addTransaction(transaction);
    // Reload transactions to update the view
    this.loadTransactions();
  }
}
