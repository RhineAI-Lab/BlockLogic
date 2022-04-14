import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {SpaceState, ThemeType} from "../../../space/services/space-state.service";

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.less'],
})
export class IconButtonComponent implements OnInit {
  icon?: string;
  @Input() size = 16;
  @Input() fill = false;

  @Input() color = '';
  themeColor = '';
  get showColor(): string {
    return this.color.length>0 ? this.color : this.themeColor;
  }

  @ViewChild('iconWrapper')
  set iconWrapper(elementRef: ElementRef<HTMLDivElement>) {
    this.icon = elementRef.nativeElement.innerText.trim();
    this.cd.detectChanges();
  }

  constructor(
    private cd: ChangeDetectorRef,
    private state: SpaceState,
  ) {
    this.state.theme$.subscribe(theme=>{
      if(theme==ThemeType.Default){
        this.themeColor = '#6e6e6e';
      }else{
        this.themeColor = '#bbbbbb';
      }
    })
  }

  ngOnInit(): void {}
}
