import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './user-list/user-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EffectsModule } from '@ngrx/effects';
import { usersReducer } from './state/users.reducer';
import { UsersEffect } from './state/users.effect';
import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from './filter/filter.component';

const AngularMaterials = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
]

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    StoreModule.forRoot({ users: usersReducer }),
    EffectsModule.forRoot([ UsersEffect ]),

    ...AngularMaterials,
    FilterComponent,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
