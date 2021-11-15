import { Camera } from 'three';
import { FlyCameraControls } from '../models';
import { FlyCameraMovements } from '../movements';
import { FlyDashboardCommands } from './fly-dashboard.commands';

export class FlyDashboardControls extends FlyCameraControls {
  constructor(camera: Camera) {
    super(camera);
    const movements = new FlyCameraMovements(camera);
    const commands = new FlyDashboardCommands(movements);
    commands.connect();
  }
}
