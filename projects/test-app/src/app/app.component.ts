import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgMemoizedTemplateFnComponent } from '../../../ng-memoized-template-fn/src/lib/ng-memoized-template-fn.component';

@Component({
  selector: 'app-root',
  imports: [NgMemoizedTemplateFnComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test-app';
}
