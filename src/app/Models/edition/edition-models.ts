import { AuthorModel } from "../author/author-model";
import { Currency, PrintingEditionType} from "../../enums/edition/edition-enums";

export interface EditionModel {
    id: number | null;
    title: string | null;
    description: string | null;
    price: number | null;
    status: boolean | null;
    currency: Currency | null;
    editionType: PrintingEditionType | null;
    dateOfCreation:Date| null;
    authorModels: AuthorModel[]| null;
  }

  export interface EditionRequestModel {
    currentPage: number | null;
    pageSize: number | null;
    propertyForSort:string | null;
    isAscending:boolean | null;
    currency: string | null;
    title: string | null;
    editionType: string [] | null;
    minPrice: number | null| undefined;
    maxPrice: number | null | undefined;
    currentSliderFlor: number;
    currentSliderCeil: number;
  }

  export interface CurrentEditonIdModel {
    Id: number;
  }