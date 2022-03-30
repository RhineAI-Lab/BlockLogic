import { Injectable } from '@angular/core';
import {SplitComponent} from "angular-split";

@Injectable({
  providedIn: 'root'
})
export class SpaceStyleService {
  public freshMainLayout: Function;

  constructor() {
    this.freshMainLayout = (): boolean => {
      return false
    }
  }


}
