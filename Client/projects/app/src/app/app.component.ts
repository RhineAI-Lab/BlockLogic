import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {merge} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent{
  constructor(
    private router:Router,
    private routerInfo: ActivatedRoute
  ) {
    merge(this.routerInfo.queryParams, this.routerInfo.fragment).subscribe(() => {
      console.log("route change")
    });
  }
}

