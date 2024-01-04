import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { KvsTicketComponent } from './kvs-ticket/kvs-ticket.component';


@NgModule({
  declarations: [
    KvsTicketComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule
  ]
})
export class TicketModule { }
