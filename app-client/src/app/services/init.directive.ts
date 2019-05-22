import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[appInit]',
  exportAs: '[appInit]'
})
export class InitDirective {

  @Input() init;

  constructor() { }

  ngOnInit() {
    if(this.init) {
      this.init();
    }
  }

}
