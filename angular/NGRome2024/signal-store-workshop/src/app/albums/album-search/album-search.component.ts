import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ProgressBarComponent } from '@/shared/ui/progress-bar.component';
import { SortOrder } from '@/shared/models/sort-order.model';
import { Album, searchAlbums, sortAlbums } from '@/albums/album.model';
import { AlbumFilterComponent } from './album-filter/album-filter.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { patchState, signalState, type } from '@ngrx/signals';
import { AlbumsService } from '../albums.service';

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, exhaustMap, interval, map, pipe, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { TodosStore } from '@/demo';
import { AlbumSearchStore } from './album-search.store';

type AlbumState = {
  albums: Album[];
  showProgress: boolean;
  query: string;
  order: SortOrder;
};
@Component({
  selector: 'ngrx-album-search',
  standalone: true,
  imports: [ProgressBarComponent, AlbumFilterComponent, AlbumListComponent],
  template: `
    <!-- <ngrx-progress-bar [showProgress]="state.showProgress()" />
    <div class="container">
      <h1>Albums ({{ totalAlbums() }})</h1>
      <ngrx-album-filter
        [query]="state.query()"
        [order]="state.order()"
        (queryChange)="updateQuery($event)"
        (orderChange)="updateOrder($event)"
      />
      <ngrx-album-list
        [albums]="filteredAlbums()"
        [showSpinner]="showSpinner()"
        [count]="0"
      />
    </div> -->
    <!-- AFTER MOVING TO SIGNAL STORE: -->
     
    <ngrx-progress-bar [showProgress]="albumSearchStore.showProgress()" />
    <div class="container">
      <h1>Albums ({{ albumSearchStore.totalAlbums() }})</h1>
      <ngrx-album-filter
        [query]="albumSearchStore.query()"
        [order]="albumSearchStore.order()"
        (queryChange)="albumSearchStore.updateQuery($event)"
        (orderChange)="albumSearchStore.updateOrder($event)"
      />
      <ngrx-album-list
        [albums]="albumSearchStore.filteredAlbums()"
        [showSpinner]="albumSearchStore.showSpinner()"
        [count]="0"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AlbumSearchComponent implements OnInit {
  readonly #albumsService = inject(AlbumsService);
  // readonly #snackBar = inject(MatSnackBar);

  // define the signalState for the albums state with its initial state
  // readonly state = signalState<AlbumState>({
  //   albums: [] as Album[],
  //   showProgress: false,
  //   query: '',
  //   order: 'asc' as SortOrder,
  // });
  // commented AFTER MOVING TO SIGNAL STORE

  // here i need to call the signal because i need its value, not the signal itself, thats why i had to use albums() and not albums etc
  // readonly filteredAlbums = computed(() => {
  //   const searchedAlbums = searchAlbums(
  //     this.state.albums(),
  //     this.state.query(),
  //   );
  //   return sortAlbums(searchedAlbums, this.state.order());
  // });
  // readonly totalAlbums = computed(() => this.state.albums().length);
  // readonly showSpinner = computed(
  //   () => this.state.showProgress() && !this.totalAlbums,
  // );
  // commented AFTER MOVING TO SIGNAL STORE

  readonly albumSearchStore = inject(AlbumSearchStore);

  onRefresh(): void {
    // this.loadAllAlbums();
    // commented AFTER MOVING TO SIGNAL STORE
  }

  // updateQuery(query: string): void {
  //   patchState(this.state, { query });
  // }
  // updateOrder(order: SortOrder): void {
  //   patchState(this.state, { order });
  // }
  // commented AFTER MOVING TO SIGNAL STORE

  ngOnInit(): void {
    // this.onRefresh();
  }

  // private loadAllAlbums(): void {
  //   patchState(this.state, {showProgress: true});

  //   this.#albumsService.getAll().subscribe(
  //     (albums) => (patchState(this.state, {albums, showProgress: false})),
  //     (error: {message: string}) => {
  //       patchState(this.state, {showProgress: false});
  //       console.error(error.message);
  //       // this.#snackBar.open(error.message, 'Close', {duration: 5_000})
  //     }
  //   )
  // }

  // now using rxMethod:
  // pass void to rxMethod if not arguments are required
  // readonly loadAllAlbums = rxMethod<void>(
  //   pipe(
  //     tap(() => patchState(this.state, { showProgress: true })),
  //     exhaustMap(() => this.#albumsService.getAll()),
  //     tap((albums: Album[]) =>
  //       patchState(this.state, { albums, showProgress: false }),
  //     ),
  //     catchError((error: { message: string }) => {
  //       patchState(this.state, { showProgress: false });
  //       console.error(error.message);
  //     }),
  //   ),
  // );

  // doing as before the catchError theres a problem, it will unsubscribe if catcherror gets fired, to avoid it we can handle the error from an inner level, like so:
  // readonly loadAllAlbums2 = rxMethod<void>(
  //   pipe(
  //     tap(() => patchState(this.state, { showProgress: true })),
  //     exhaustMap(() =>
  //       this.#albumsService.getAll().pipe(
  //         tap((albums: Album[]) =>
  //           patchState(this.state, { albums, showProgress: false }),
  //         ),
  //         catchError((error: { message: string }) => {
  //           patchState(this.state, { showProgress: false });
  //           console.error(error.message);
  //         }),
  //       ),
  //     ),
  //   ),
  // );

  // which can be again shortened using the tapResponse operator:
  // readonly loadAllAlbums = rxMethod<void>(
  //   pipe(
  //     tap(() => patchState(this.state, { showProgress: true })),
  //     exhaustMap(() =>
  //       this.#albumsService.getAll().pipe(
  //         tapResponse(
  //           (albums) => patchState(this.state, { albums, showProgress: false }),
  //           (error: { message: string }) => {
  //             patchState(this.state, { showProgress: false });
  //             console.error(error.message);
  //           },
  //         ),
  //       ),
  //     ),
  //   ),
  // );
  // commented AFTER MOVING TO SIGNAL STORE

}
