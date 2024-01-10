import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KvsTicketComponent } from './kvs-ticket/kvs-ticket.component';

const routes: Routes = [  {path:'', component:KvsTicketComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
