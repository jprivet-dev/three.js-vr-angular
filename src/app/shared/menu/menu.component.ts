import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() hdDefinitionActive: boolean = true;

  @Input() isflyMode!: boolean | null;
  @Input() isHDDefinition!: boolean | null;
  @Input() isAntialias!: boolean | null;

  @Output() switchFlyMode = new EventEmitter();
  @Output() switchDefinition = new EventEmitter();
  @Output() switchAntialias = new EventEmitter();

  ngOnInit(): void {}

  onSwitchFlyMode() {
    this.switchFlyMode.next();
  }

  onSwitchDefinition() {
    this.switchDefinition.next();
  }

  onSwitchAntialias() {
    this.switchAntialias.next();
  }
}
