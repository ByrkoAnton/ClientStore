import { EditionModel } from "../edition/edition-models";
import { PageModel } from "../page/page-model";

export interface StoreModel {
    sliderFloor: number,
    sliderCeil: number 
    models: EditionModel[],
    pageModel: PageModel,
  };