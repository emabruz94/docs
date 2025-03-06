import { ChangeDetectionStrategy, Component, Input, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCard, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { Album } from '@/albums/album.model';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'ngrx-album-list',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    MatProgressSpinner,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
  ],
  template: `
    @if (showSpinner()) {
      <mat-spinner />
    } @else {
      <div class="albums-container">
        @for (album of albums(); track album.id) {
          <a [routerLink]="[album.id]">
            <mat-card>
              <div class="album-content">
                <div>
                  <mat-card-title>{{ album.title }}</mat-card-title>
                  <mat-card-subtitle>by {{ album.artist }}</mat-card-subtitle>
                </div>

                <div class="album-info">
                  <p>
                    <strong>Release Date: </strong>
                    {{ album.releaseDate | date }}
                  </p>
                  <p><strong>Genre:</strong> {{ album.genre }}</p>
                </div>
              </div>

              <img
                [src]="album.coverImage"
                [alt]="album.title + ' Cover Image'"
                height="150"
                width="150"
              />
            </mat-card>
          </a>
        }
      </div>
    }
  `,
  styleUrl: './album-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumListComponent {

  readonly albums = input<Album[]>([]);
  readonly showSpinner = input(false);

  // 1.
  // @Input() count = 0
  // doubleCount = 0
  // implement ngonchanges and update doubleCount depending on the changes on the input count
  // 2.
  // count$ = new BehaviorSubject(0);
  // doubleCount$ = this.count$.pipe(
  //   map((count) => (count*2))
  // )
  // @Input({required: true}) set (count: number){
  //   this.count$.next(count);
  // }
  // 3. instead, more rapidly w signals:
  readonly count = input.required<number>();  // input,required already returns a signal (InputSignal)
  readonly doubleCount = computed<number>(this.count);


}
