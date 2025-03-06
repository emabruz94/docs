// import { computed, inject } from '@angular/core';
// import {
//   patchState,
//   signalStore,
//   withComputed,
//   withHooks,
//   withMethods,
//   withState,
// } from '@ngrx/signals';
// import { AlbumsService } from '../albums.service';
// import { Album, searchAlbums, sortAlbums } from '../album.model';
// import { SortOrder, toSortOrder } from '@/shared/models/sort-order.model';
// import { rxMethod } from '@ngrx/signals/rxjs-interop';
// import { exhaustMap, filter, pipe, tap } from 'rxjs';
// import { tapResponse } from '@ngrx/operators';
// import {
//   setError,
//   setFulfilled,
//   withRequestStatus,
// } from '@/shared/state/request-status.feature';
// import { ActivatedRoute, Params, Router } from '@angular/router';
// import { toSignal } from '@angular/core/rxjs-interop';
// import { withQueryParams } from '@/shared/state/route/query-params.feature';

// // SIGNAL STORE DEMO
// type AlbumState = {
//   albums: Album[];
//   //   showProgress: boolean; // commented after withRequestStatus
//   query: string;
//   order: SortOrder;
//   isPending: boolean
// };

// export const AlbumSearchStore = signalStore(
//   { providedIn: 'root' }, // to provide this single instance anywhere without needing to put it in a provider
//   withState<AlbumState>({
//     albums: [] as Album[],
//     //showProgress: false, // commented after withRequestStatus
//     query: '',
//     order: 'asc' as SortOrder,
//     isPending: false
//   }),
//   withRequestStatus(),
//   withQueryParams({
//     query: (val) => val ?? '',
//     order: toSortOrder
//   }),
//   withComputed((store) => {
//     // commented after withRequestStatus: , showProgress }) => ({
//     // filteredAlbums: computed(() => {
//     //   const searchedAlbums = searchAlbums(albums(), query());
//     //   return sortAlbums(searchedAlbums, order());
//     // }),
//     // totalAlbums: computed(() => albums().length),
//     // showSpinner: computed(() => !!(showProgress() && albums().length)), // commented after withRequestStatus
//     const filteredAlbums = computed(() => {
//       const searchedAlbums = searchAlbums(store.albums(), store.query());
//       return sortAlbums(searchedAlbums, store.order());
//     });

//     // moduke 6: routing
//     // const activatedRoute = inject(ActivatedRoute);
//     // const queryParams = toSignal(activatedRoute.queryParams, {initialValue: {} as Params}) // opposite of toSignal is toObservable
//     // const query = computed(() => queryParams()['query'] ?? '');
//     // const order = computed(() => toSortOrder(queryParams()['order']))
//     //---
//     // we can remove them after adding withQueryParams:

//     return {
//       filteredAlbums,
//       showProgress: store.isPending,
//       showSpinner: computed(() => store.isPending() && store.albums().length === 0),
//       totalAlbums: computed(() => filteredAlbums().length),
//     };
//   }),
//   withMethods((store, albumsService = inject(AlbumsService), router = inject(Router)) => ({
//     // updateQuery(query: string): void {
//     //     //   patchState(store, { query });

//     //     // after module 6 routing:
//     //     router.navigate([.....])
//     // },
//     // updateOrder(order: SortOrder): void {
//     //   patchState(store, { order });
//     // },
//     // we can remove these 2 updates methods after using withQueryParams

//     loadAllAlbums: rxMethod<void>(
//       pipe(
//         // tap(() => patchState(store, { showProgress: true })),
//         tap(() => patchState(store, setFulfilled())),
//         exhaustMap(() =>
//           albumsService.getAll().pipe(
//             tapResponse(
//               //   (albums) => patchState(store, { albums, showProgress: false }),
//               (albums) => patchState(store, { albums }, setFulfilled()),
//               (error: { message: string }) => {
//                 // patchState(store, { showProgress: false });
//                 patchState(store, setFulfilled());
//                 // console.error(error.message);
//                 setError(error.message);
//               },
//             ),
//           ),
//         ),
//       ),
//     ),
//     notifyOnError: rxMethod<string | null>(
//       pipe(
//         filter(Boolean), //filtra i booleani
//         tap((error) => console.error(error)),
//       ),
//     ),
//   })),
//   withHooks({
//     onInit: ({ loadAllAlbums, notifyOnError, error }) => {
//       loadAllAlbums();
//       notifyOnError(error);
//     },
//   }),
// );

// export type AlbumSearchStore = InstanceType<typeof AlbumSearchStore>;


// AFTER MODULE 7 creating an ALBUM STORE to handle the album specific code

import { computed, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, pipe, tap } from 'rxjs';
import {
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { toSortOrder } from '@/shared/models/sort-order.model';
import { withQueryParams } from '@/shared/state/route/query-params.feature';
import { searchAlbums, sortAlbums } from '@/albums/album.model';
import { AlbumsStore } from '@/albums/albums.store';

export const AlbumSearchStore = signalStore(
  withQueryParams({
    query: (param) => param ?? '',
    order: toSortOrder,
  }),
  withComputed(({ query, order }, albumsStore = inject(AlbumsStore)) => {
    const filteredAlbums = computed(() => {
      const searchedAlbums = searchAlbums(albumsStore.entities(), query());
      return sortAlbums(searchedAlbums, order());
    });

    return {
      filteredAlbums,
      showProgress: albumsStore.isPending,
      showSpinner: computed(
        () => albumsStore.isPending() && albumsStore.entities().length === 0,
      ),
      totalAlbums: computed(() => filteredAlbums().length),
    };
  }),
  withMethods((_, snackBar = inject(MatSnackBar)) => ({
    notifyOnError: rxMethod<string | null>(
      pipe(
        filter(Boolean),
        tap((error) => snackBar.open(error, 'Close', { duration: 5_000 })),
      ),
    ),
  })),
  withHooks({
    onInit({ notifyOnError }, albumsStore = inject(AlbumsStore)) {
      albumsStore.loadAllAlbums();
      notifyOnError(albumsStore.error);
    },
  }),
);