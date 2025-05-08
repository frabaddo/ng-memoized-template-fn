import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  InjectionToken,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { memoized } from './utility-functions/memoized';
import { computedFn } from './utility-functions/computedFn';
import { pipeFn } from './utility-functions/pipeFn';

const token = new InjectionToken('testToken', {
  providedIn: 'root',
  factory: () => 2,
});

const pipeTestFn = pipeFn(
  (tokens, value: string) => {
    console.log('memoized pipe: ', value);
    let x = 0;
    let l = Math.ceil(10000 * Math.random());
    new Array(l).fill(1).forEach((e, i) => {
      e++;
      if (i === l - 1) x = i;
    });
    return computed(
      () => value + ' test pipe ' + 'as pipe ' + tokens.token + ' ' + x + '!'
    );
  },
  () => {
    let _token = inject(token);
    return {
      token: _token,
    };
  }
);

@Component({
  selector: 'ng-memoized-template-fn-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>{{ testFn(name)() }}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular
    </a>
    <br/>
    <br/>
    <input [(ngModel)]="name" />
    <input [(ngModel)]="suffix" />
    <br/>
    <br/>
    <button (click)="ok()">test</button>

    <h1>{{ compFn(name)() }}!</h1>
    <h1>{{ pipeTestFn(name)() }}!</h1>

  `,
})
export class NgMemoizedTemplateFnComponent {
  name = 'Angular';
  suffix = signal('vs 20');

  pipeTestFn = pipeTestFn();

  testFn = memoized((value: string) => {
    console.log('memoized: ', value);
    let x = 0;
    let l = Math.ceil(10000 * Math.random());
    new Array(l).fill(1).forEach((e, i) => {
      e++;
      if (i === l - 1) x = i;
    });
    return computed(
      () => value + ' test memoized ' + this.suffix() + ' ' + x + '!'
    );
  });

  compFn = computedFn((value) => {
    console.log('computed: ', value);
    let x = 0;
    let l = Math.ceil(10000 * Math.random());
    new Array(l).fill(1).forEach((e, i) => {
      e++;
      if (i === l - 1) x = i;
    });
    return value + ' test computed ' + this.suffix() + ' ' + x + '!';
  });

  ok() {}
}
