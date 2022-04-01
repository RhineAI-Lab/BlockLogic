import {Injectable} from '@angular/core';
import {SpaceModule} from "../space.module";

@Injectable({
  providedIn: 'root'
})

export class SpaceStyleService {
  public freshMainLayout: Function;
  public hideSidebar: Function;

  public showHeader: boolean = true;

  public option = {

  }

  constructor() {
    this.freshMainLayout = (): boolean => {
      return false
    }
    this.hideSidebar = (name: string): boolean => {
      return false
    }
  }

  onChangeHeaderDisplay(show: boolean){
    this.showHeader = show
  }

}
