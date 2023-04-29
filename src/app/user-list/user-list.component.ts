import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UserListDataSource } from './user-list-datasource';
import { User } from './users.model';
import { Store } from '@ngrx/store';
import { UsersApiActions } from '../state/users.action';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;
  dataSource: UserListDataSource;

  displayedColumns = ['id', 'firstName', 'lastName', 'age', 'gender', 'email', 'phone', 'birthDate', 'eyeColor'];

  columns: {fieldName: string; title: string}[] = [
    {fieldName: 'id', title: 'ID'},
    {fieldName: 'firstName', title: 'First Name'},
    {fieldName: 'lastName', title: 'Last Name'},
    {fieldName: 'age', title: 'Age'},
    {fieldName: 'gender', title: 'Gender'},
    {fieldName: 'email', title: 'Email'},
    {fieldName: 'phone', title: 'Phone'},
    {fieldName: 'birthDate', title: 'Birth Date'},
    {fieldName: 'eyeColor', title: 'Eye Color'},
  ]

  constructor(private store: Store) {
    this.dataSource = new UserListDataSource(store);
  }

  ngOnInit(): void {
    this.store.dispatch(UsersApiActions.retrieveUserList());
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
