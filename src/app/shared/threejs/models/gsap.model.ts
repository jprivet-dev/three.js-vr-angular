import { gsap } from 'gsap';

export class GSAPControls {
  private list: gsap.core.Tween[] = [];

  add(element: gsap.core.Tween): void {
    if (this.list.includes(element)) {
      console.error('Element already exists:', element);
      return;
    }

    this.list.push(element);
  }

  remove(element: gsap.core.Tween): void {
    this.list.forEach((current, index) => {
      if (current === element) {
        this.list.splice(index, 1);
      }
    });
  }

  play() {
    this.list.map((element) => element.play());
  }

  pause() {
    this.list.map((element) => element.pause());
  }
}
