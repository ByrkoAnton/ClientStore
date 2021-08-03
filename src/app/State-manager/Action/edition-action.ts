import { CurrentEditonIdModel } from "src/app/Models/edition/edition-models";

export class GetEdition {
    static readonly type = '[Edition] Edition';
    constructor(public payload: CurrentEditonIdModel) {}
  }

  export class StoreCurrentEditonId {
    static readonly type = '[Edition] CurrentEditonId';
    constructor(public payload: CurrentEditonIdModel) {}
  }