import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html',
  styleUrls: ['./list-expenses.component.css']
})
export class ListExpensesComponent implements OnInit {

  expenses: Expense[] = [];

  filters = {
    keyword: ''
  }

  constructor(private _expenseService: ExpenseService) { }

  ngOnInit(): void {
    this._expenseService.getExpenses().subscribe(
      data => this.expenses = data
    )
  }

  listExpenses(){
    this._expenseService.getExpenses().subscribe(
      data => this.expenses = this.filterExpenses(data)
      )
  }

  filterExpenses(expenses: Expense[]) {
    //console.log(this.filters);
    return expenses.filter((e) => {
      return e.expense.toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }

}
