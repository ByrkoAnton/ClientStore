import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeSignOut = new EventEmitter(); 
  invokeCart = new EventEmitter(); 
  invokeClearCart = new EventEmitter(); 
  subsVar!: Subscription;    
    
  constructor() { }    
    
  signOut() {    
    this.invokeSignOut.emit();    
  }   
  
  clearCart()
  {
    this.invokeClearCart.emit();
  }
}
