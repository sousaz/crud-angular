import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-error-dialog',
    standalone: false,
    templateUrl: './error-dialog.component.html',
    styleUrl: './error-dialog.component.scss',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose]
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: String) {}
}
