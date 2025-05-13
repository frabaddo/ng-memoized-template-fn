import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  InjectionToken,
  Signal,
  signal,
} from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { memoized } from './utility-functions/memoized';
// import { computedFn } from './utility-functions/computedFn';
import { createPipe } from './utility-functions/createPipe';

const NumberToken = new InjectionToken('testToken', {
  providedIn: 'root',
  factory: () => 1,
});
const StringToken = new InjectionToken('testToken', {
  providedIn: 'root',
  factory: () => 'testToken',
});

const injectPipeTestFn = createPipe((value: string) => {
  let numberToken = inject(NumberToken);
  let stringToken = inject(StringToken);
  let x = 0;
  let l = 1; // Math.ceil(10000 * Math.random());
  new Array(l).fill(1).forEach((e, i) => {
    e++;
    if (i === l - 1) x = i;
  });
  return {
    value,
    token1: numberToken,
    token2: stringToken,
  };
});

const injectJsonPipe = createPipe(
  (value: any) => {
    return JSON.stringify(value, null, 2);
  },
  { pure: false }
);

@Component({
  selector: 'ng-memoized-template-fn-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NumberToken,
      useValue: 2,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input [(ngModel)]="name" />
    <input [(ngModel)]="suffix" />
    <br />
    <br />
    <button (click)="ok()">test</button>
    <!-- <h1>{{ compFn(name)() }}!</h1> -->
    <!-- <h1>{{ testFn(name)() }}!</h1> -->
    <h1>{{ jsonPipe(pipeTestFn(nameWithSuffix())) }}!</h1>

    <h1>{{ computedTestPipe(this.obj)() }}</h1>
  `,
})
export class NgMemoizedTemplateFnComponent {
  name = signal('Angular');
  suffix = signal('vs 20');

  obj = {
    name: "test"
  }

  nameWithSuffix = computed(() => this.name() + this.suffix());

  pipeTestFn = injectPipeTestFn();
  jsonPipe = injectJsonPipe();

  computedTestPipe = createPipe((value: {name: string}) => {
    console.log('changed computed pipe');
    let x = 0;
    let l = 1; // Math.ceil(10000 * Math.random());
    new Array(l).fill(1).forEach((e, i) => {
      e++;
      if (i === l - 1) x = i;
    });
    return computed(() => {
      console.log('in computed');
      return value.name + ' ' + this.suffix() + ' test in pipe 2';
    });
  }, {pure: false})();

  // testFn = memoized((value: string) => {
  //   console.log('memoized: ', value);
  //   let x = 0;
  //   let l = Math.ceil(10000 * Math.random());
  //   new Array(l).fill(1).forEach((e, i) => {
  //     e++;
  //     if (i === l - 1) x = i;
  //   });
  //   return computed(
  //     () => value + ' test memoized ' + this.suffix() + ' ' + x + '!'
  //   );
  // });

  // compFn = computedFn((value) => {
  //   console.log('computed: ', value);
  //   let x = 0;
  //   let l = Math.ceil(10000 * Math.random());
  //   new Array(l).fill(1).forEach((e, i) => {
  //     e++;
  //     if (i === l - 1) x = i;
  //   });
  //   return value + ' test computed ' + this.suffix() + ' ' + x + '!';
  // });

  ok() {}
}
