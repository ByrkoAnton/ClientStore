import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { EditionModel } from 'src/app/Models/edition/edition-models';
import { CartService } from 'src/app/Services/cart/cart.service';
import { EventEmitterService } from 'src/app/Services/event-emitter/event-emitter.service';
import { GetEdition } from 'src/app/State-manager/Action/edition-action';
import { AuthState } from 'src/app/State-manager/State/auth-state';
import { EditonState as EditionState } from 'src/app/State-manager/State/edition-state';

@Component({
  selector: 'app-edition-profile',
  templateUrl: './edition-profile.component.html',
  styleUrls: ['./edition-profile.component.scss']
})

export class EditionProfileComponent implements OnInit {

  constructor(private store: Store, private eventEmitterService: EventEmitterService,  private cartService: CartService) {
  }

  id$ = this.store.select(EditionState.getCurrentEditionId);
  edition$ = this.store.select(EditionState.getCurrentEdition)
  isAuthenticated!: boolean;
  auth = this.store.select(AuthState.isAuthenticated).subscribe(res => {
    this.isAuthenticated = res;
  });

  editionQty: number = 1;
  edition:EditionModel = {} as EditionModel
  
  ngOnInit(): void {

    this.store.select(EditionState.getCurrentEditionId).subscribe((x: number) => {
      this.getEdition(x);
    }) 

    this.store.select(EditionState.getCurrentEditionPrice)
  }

  getEdition(editionId: number): void {
    this.store.dispatch(new GetEdition({
      Id: editionId
    }))
  }

  signOut() {
    this.eventEmitterService.signOut();
  }

  addToCart()
  {
    var edition: EditionModel={} as EditionModel;
    this.edition$.subscribe((x:EditionModel|null)=> {
      edition = x!;
    })
    this.cartService.addToCart(edition, this.editionQty)
  }
}
