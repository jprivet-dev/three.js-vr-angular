import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() isflyMode!: boolean | null;
  @Input() isAntialias!: boolean | null;
  @Input() isHDDefinition!: boolean | null;

  @Output() switchFlyMode = new EventEmitter();
  @Output() switchAntialias = new EventEmitter();
  @Output() switchDefinition = new EventEmitter();

  ngOnInit(): void {}

  onSwitchFlyMode() {
    this.switchFlyMode.next();
  }

  onSwitchAntialias() {
    this.switchAntialias.next();
  }

  onSwitchDefinition() {
    this.switchDefinition.next();
  }
}
