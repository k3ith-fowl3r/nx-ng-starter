import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AppMarkdownService } from '@nx-ng-starter/client-services';
import { TIMEOUT } from '@nx-ng-starter/client-util';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHomeComponent {
  public readonly timer$ = timer(TIMEOUT.INSTANT, TIMEOUT.MEDIUM).pipe(
    map(num => `Until destoyed timer ${num}`),
    untilDestroyed(this),
  );

  constructor(private readonly markdown: AppMarkdownService) {}

  /**
   * Returns sample processed markdown text.
   */
  public getMarkedInstructions(): string {
    const sidenavInstruction =
      'Open **sidenav** by clicking **logo** or **icon** button in the left corner of the browser window, and select an item \n\n';
    const markdownInstructions =
      '# You can use Markdown \n\n via AppMarkdownService, just like in this example.';
    return this.markdown.process(`${sidenavInstruction} ${markdownInstructions}`);
  }
}