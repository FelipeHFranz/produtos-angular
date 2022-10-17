import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }


  public async openSnackBarTopCenter(message: string, action: string = 'Ok', timeDuration: number = 3500 ) {
         
    this._snackBar.open(message, action, {
      duration: timeDuration,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
  
  public snackGeneric(
    message: string,
    action: string, 
    timeDuration: number = 3500,
  ) {
    this._snackBar.open(message, action, {
      duration: timeDuration,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
