import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogTitle } from '@angular/material/dialog';
import { PeriodicElement } from '../../models/periodic-element-model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { StateService } from '../../services/state.service';

export interface TableData {
  tableRow: PeriodicElement
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ 
    MatDialogContent, 
    MatFormFieldModule, 
    MatDialogActions, 
    MatInputModule,
    FormsModule,
    MatButtonModule, 
    MatDialogClose, 
    MatDialogTitle
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly data = inject<TableData>(MAT_DIALOG_DATA);
  injectedRow = this.data.tableRow
  tempRow: PeriodicElement = {...this.injectedRow}

  constructor(public stateService: StateService){}

  onSaveClick(){
    this.injectedRow.position = this.tempRow.position
    this.injectedRow.name = this.tempRow.name
    this.injectedRow.weight = this.tempRow.weight
    this.injectedRow.symbol = this.tempRow.symbol

    this.dialogRef.close();
  }
  
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
