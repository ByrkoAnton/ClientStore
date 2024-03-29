import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { CurrentEditonIdModel, EditionModel } from "src/app/Models/edition/edition-models";

import { EditionService } from "src/app/Services/edition/edition.service";
import { GetEdition, StoreCurrentEditonId } from "../Action/edition-action";


@State<EditionModel>({
    name: 'CurrentEdition'
})

@Injectable()
export class EditonState {
    constructor(private editionService:EditionService, private router: Router) { }

    @Selector()
    static getCurrentEditionId(state: CurrentEditonIdModel):number {
        return state.Id;
    }

    @Selector()
    static getCurrentEdition(state: EditionModel): EditionModel | null {
    return state;
  }

  @Selector()
    static getCurrentEditionPrice(state: EditionModel):number|null {
        return state.price;
    }

    @Action(StoreCurrentEditonId)
    storeCurrentEditonId(context: StateContext<CurrentEditonIdModel>, action: StoreCurrentEditonId) {
        context.patchState({
          Id: action.payload.Id
        });    
  }

    @Action(GetEdition)
    getCurrentEdition(context: StateContext<EditionModel>, action: GetEdition) {
    return this.editionService.getEditions(action.payload).pipe(
      tap((result) => {
        context.patchState(result);
      })
    )
  }

}