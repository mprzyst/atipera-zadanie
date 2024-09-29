import { Injectable } from '@angular/core';
import { rxState } from '@rx-angular/state';
import { PeriodicElement } from '../models/periodic-element-model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  readonly state = rxState<{ periodicElements: PeriodicElement[], filterValue: string }>(({ set }) => {
    set({ 
      periodicElements: [], 
      filterValue: '' 
    });
  });
  
}
