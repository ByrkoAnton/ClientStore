import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { CurrentEditonIdModel, EditionModel } from 'src/app/Models/edition/edition-models';
import { SliderModel } from 'src/app/Models/slider/slider-model';
import { StoreModel } from 'src/app/Models/store/store-model';
import { StoreService } from 'src/app/Services/store/store.service';
import { GetFiltratedEditions} from '../Action/store-action';


@State<StoreModel>({
    name: 'Store'
  })

@Injectable()
export class StoreState {
  //sliderParams: SliderModel ={} as SliderModel;

  constructor(private storeService:StoreService, private router: Router) { }

  @Selector()
  static getEditions(state: StoreModel): EditionModel[] | null {
    return state.models;
  }

  @Selector()
  static getTotalPages(state: StoreModel): number | null {
    return state.pageModel.totalPages;
  }

  @Selector()
  static getSliderFloor(state: StoreModel): number  {
    return state.sliderFloor;
  }

  @Selector()
  static getSliderParams(state:StoreModel): [number, number]{
    var sliderFloor = state.sliderFloor;
    var sliderCeil = state.sliderCeil;
    return[sliderFloor, sliderCeil]
  }

  @Selector()
  static getSliderCeil(state: StoreModel): number  {
    return state.sliderCeil;
  }

  

  @Action(GetFiltratedEditions)
  getEditions(context: StateContext<StoreModel>, action: GetFiltratedEditions) {
    return this.storeService.getEditions(action.payload).pipe(
      tap((result) => {
        context.patchState(result);
      })
    )
  }
}