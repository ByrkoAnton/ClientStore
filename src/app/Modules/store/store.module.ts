import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from 'src/app/Components/store/store.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({

  declarations: [
    StoreComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule,
    BrowserModule,
    NgbModule,
    NgSelectModule,
    NgxSliderModule,    
  ],
  exports: [StoreComponent],
  bootstrap: [StoreComponent],

})
export class StoreModule { }
