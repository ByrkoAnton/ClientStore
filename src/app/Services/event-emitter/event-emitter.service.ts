import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeSignOut = new EventEmitter();    
  subsVar: any;    
    
  constructor() { }    
    
  signOut() {    
    this.invokeSignOut.emit();    
  }    
}
