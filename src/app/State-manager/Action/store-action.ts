import { CurrentEditonIdModel, EditionRequestModel } from "src/app/Models/edition/edition-models";

export class GetFiltratedEditions {
    static readonly type = '[Store] FiltratedEdition';
    constructor(public payload: EditionRequestModel) {}
  }
