import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../../models/periodic-element-model';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { StateService } from '../../services/state.service';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ 
    MatTableModule, 
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule,
    MatSortModule, 
    CommonModule
   ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol']
  dataSource: MatTableDataSource<PeriodicElement>
  readonly dialog = inject(MatDialog);
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PeriodicElement>;
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
 
  constructor(
    public stateService: StateService,
    public apiService: ApiService,
  ){}

  ngOnInit(){
    this.apiService.getPeriodicElements()
      .subscribe((periodicElements) => this.stateService.state.set({periodicElements: periodicElements}))
    
      this.stateService.state.select('periodicElements')
      .subscribe((periodicElements) => this.dataSource = new MatTableDataSource(periodicElements));

    this.stateService.state.select('filterValue').subscribe((filterValue) => {
      this.applyFilter(filterValue);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      map((event: any) => event.target.value)
    ).subscribe((value: string) => {
      this.stateService.state.set({ filterValue: value.trim().toLowerCase() });
    });
  }

  openDialog(tableRow: PeriodicElement) {
    this.dialog.open(DialogComponent, {
      data: {
        tableRow: tableRow,
      },
    });
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }
}

  