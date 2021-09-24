import { EditionModel } from "../edition/edition-models";
import { PageModel } from "../page/page-model";

export interface StoreModel {
    sliderFloor: number|null,
    sliderCeil: number|null 
    models: EditionModel[]|null,
    pageModel: PageModel|null,
  };