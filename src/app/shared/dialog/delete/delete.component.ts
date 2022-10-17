import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})

@Injectable({ providedIn: 'root' })
export class DeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }



  ngOnInit(): void {
  }

}
