import {Injectable} from '@angular/core';
import {SpaceModule} from "../space.module";

@Injectable({
  providedIn: 'root'
})

export class SpaceStyleService {
  public freshMainLayout: Function;
  public hideSidebar: Function;

  constructor() {
    this.freshMainLayout = (): boolean => {
      return false
    }
    this.hideSidebar = (name: string): boolean => {
      return false
    }
  }

}
