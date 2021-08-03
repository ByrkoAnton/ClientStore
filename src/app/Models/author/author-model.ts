import { EditionModel } from "../edition/edition-models";

export interface AuthorModel {
    id: number | null;
    name: string | null;
    dateOfCreation:Date| null;
    printingEditionModels:EditionModel[] | null;
  }