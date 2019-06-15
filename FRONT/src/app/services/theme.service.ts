import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ThemeService {

  theme = new Subject<string>();

  constructor(
    ) {}

    changeColor(color: string) {
      console.log(color);

      this.theme.next(color);
    }

}
