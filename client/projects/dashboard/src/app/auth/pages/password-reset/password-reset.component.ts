import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { MatchValidators, PasswordReset, ResponseMessage } from '@inv/core';
import { IAppState } from '../../../core/store/state/app.state'
import { fadeAnimation } from '../../../shared/animations/fade-in-out.animation';
import { passwordReset, passwordResetResult } from '../../../core/store/actions/account.actions';
import { selectPasswordResetResult } from '../../../core/store/selectors/account.selector';

@Component({
  selector: 'inv-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  animations: [fadeAnimation]
})
export class PasswordResetComponent implements OnInit {
  public form: FormGroup;
  public passwordResetResult$: Observable<ResponseMessage>;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<IAppState>,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.form = this._formBuilder.group({
      code: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8)]]
    }, { 
      validator: MatchValidators.mustMatch('password', 'passwordConfirm')
    });
  }

  ngOnInit(): void {
    this.passwordResetResult$ = this._store.select(selectPasswordResetResult).pipe(
      filter(result => result !== null),
      tap(result => {
        this.form.reset();
        setTimeout(() => {
          this._store.dispatch(passwordResetResult(null));
          this._router.navigate(['../login']);
        }, 5000)
      })   
    );

    this._route.queryParams
      .pipe(take(1))
      .subscribe(params => this.form.patchValue({ code: params['code'] }))
  }

  public onSubmit(resetValues: PasswordReset): void {
    this._store.dispatch(passwordReset(resetValues));
  }
}
