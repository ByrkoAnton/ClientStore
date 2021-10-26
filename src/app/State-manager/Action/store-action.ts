import { ActionConstants } from "src/app/app-constants";
import { CurrentEditonIdModel, EditionRequestModel } from "src/app/Models/edition/edition-models";

export class GetFiltratedEditions {
    static readonly type = ActionConstants.StoreGetEditions;
    constructor(public payload: EditionRequestModel) {}
  }
