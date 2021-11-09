import { ActionConstants } from "src/app/app-constants";
import { CurrentEditonIdModel, EditionModel } from "src/app/models/edition/edition-models";

export class GetEdition {
    static readonly type = ActionConstants.EditionGet;
    constructor(public payload: CurrentEditonIdModel) {}
  }

  export class StoreCurrentEdition {
    static readonly type = ActionConstants.EditionStoreCurrent;
    constructor(public payload: EditionModel) {}
  }

  export class StoreCurrentEditonId {
    static readonly type = ActionConstants.EditionStoreCurrentId;
    constructor(public payload: CurrentEditonIdModel) {}
  }