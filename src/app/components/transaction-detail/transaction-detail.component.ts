import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {
  transaction!: Transaction;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.transactionService.getTransactionById(id).subscribe((data: Transaction) => {
        this.transaction = data;
      },(error) => {
        if (error.status === 403) {
          this.router.navigate(['/login']);
        } else {
          console.error('Error fetching transactions', error);
        }
      });
    }
  }

  updateTransaction(): void {
    if (this.transaction && this.transaction._id) {
      this.transactionService.updateTransaction(this.transaction._id, this.transaction)
        .subscribe(() => this.router.navigate(['/transaction-list']),
        (error) => {
          if (error.status === 403) {
            this.router.navigate(['/login']);
          } else {
            console.error('Error fetching transactions', error);
          }
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/transaction-list']);
  }
}