import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';

@Component({
  selector: 'inv-stock-item-form',
  templateUrl: './stock-item-form.component.html',
  styleUrls: ['./stock-item-form.component.scss']
})
export class StockItemFormComponent implements OnInit {
  public form: FormGroup;

  constructor(private _parentControl: ControlContainer) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as FormGroup;
  }
}
