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

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  addEntity,
  removeEntity,
  updateAllEntities,
  withEntities,
} from '@ngrx/signals/entities';

import { interval, map, pipe, tap } from 'rxjs';
import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { AlbumsService } from './albums/albums.service';
@Component({
  selector: 'ngrx-album-search',
  standalone: true,
  imports: [],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DemoComponent {
  // RXMETHOD DEMO
  readonly logDoubledNumber = rxMethod<number>(
    pipe(
      map((num) => num * 2),
      tap(console.log),
    ),
  );
  constructor() {
    // rxMethod works the same with normal __values, observables and signals
    this.logDoubledNumber(10); //20

    const numbers$ = interval(2_000);
    this.logDoubledNumber(numbers$); // 0, 2, 4, 6 (every 2s)

    const num = signal(0);
    this.logDoubledNumber(num); //0
    num.set(10); //20

    // rxMethod returns kinda a subscription from which can obv unsubscribe
    setTimeout(() => {
      this.logDoubledNumber.unsubscribe();
      // but this will unsubscribe to everything on logDoubledNumber
      // what if i want to unsubscribe only from one of the 3 before?
      //assign one of those to const sub = and unsubscribe only to that one
    }, 10_000);
  }
}

// SIGNAL STORE DEMO
type Todo = { id: number; text: string; completed: boolean };
type TodosState = { todos: Todo[] };

export const TodosStore = signalStore(
  { providedIn: 'root' }, // to provide this single instance anywhere without needing to put it in a provider
  withState<TodosState>({ todos: [] }),
  withComputed(({ todos }) => ({
    completedTodos: computed(() => {
      return todos().filter((todo) => todo.completed);
    }),
    // to use multiple computed: (???)
    // const computedTodos2 = computed(() => {
    //     return todos().filter((todo) => todo.completed);
    // }),
    // const computedSmthElse = computed(() => {
    //     return todos().filter((todo) => todo.completed);
    // }),
    // return {computedTodos2, computedSmthElse}
  })),
  withMethods(
    (
      store,
      albumsService = inject(AlbumsService), //to inject dependencies
      // other
    ) => ({
      addTodo(todo: Todo): void {
        patchState(store, { todos: [...store.todos(), todo] });
      },
    }),
  ),
  withHooks(({ todos }) => ({
    onInit() {
      console.log('todos on init', todos());
    },
    onDestroy() {
      console.log('todos on destroy', todos());
    },
  })),
);

export type TodosStore = InstanceType<typeof TodosStore>;

// ENTITIES DEMO
type TodoE = {key: number; text: string; completed: boolean};

const todoConfig = {
    entity: type<TodoE>(),
    collection: 'todo',
    idKey: 'key'
}

export const TodosWithEnititesStore = signalStore(
  withEntities({ entity: type<TodoE>() }),
  withMethods((store) => ({
    addTodo(todo: any): void { //should have been todo: TodoE but it gives error idk why
      patchState(store, addEntity(todo, todoConfig));
    },
    removeTodo(id: number): void {
      patchState(store, removeEntity(id, todoConfig));
    },
    completeAllTodos(): void {
      patchState(store, updateAllEntities({ completed: true }, todoConfig));
    },
  })),
);
