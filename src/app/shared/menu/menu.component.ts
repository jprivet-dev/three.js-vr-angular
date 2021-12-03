import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() flyModeEnable: boolean = true;
  @Input() hdDefinitionEnable: boolean = true;

  @Input() statsActive!: boolean | null;
  @Input() flyModeActive!: boolean | null;
  @Input() hdDefinitionActive!: boolean | null;
  @Input() antialiasActive!: boolean | null;

  @Output() switchFlyMode = new EventEmitter();
  @Output() switchStats = new EventEmitter();
  @Output() switchDefinition = new EventEmitter();
  @Output() switchAntialias = new EventEmitter();

  ngOnInit(): void {}

  onSwitchFlyMode() {
    this.switchFlyMode.next();
  }

  onSwitchStats() {
    this.switchStats.next();
  }

  onSwitchDefinition() {
    this.switchDefinition.next();
  }

  onSwitchAntialias() {
    this.switchAntialias.next();
  }
}
