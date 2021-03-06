import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { InvCoreConfig, INV_CORE_CONFIG } from '../inv-core.config';
import { AbstractCrudService } from './abstract-crud.service';
import { Invoice } from '../models/invoice.model';

@Injectable()
export class InvoicesService extends AbstractCrudService<Invoice, number> {
  constructor(
    @Inject(INV_CORE_CONFIG)
    protected _config: InvCoreConfig,
    protected _http: HttpClient
  ) {
    super(_http, `${_config.api.baseUrl}/invoices`);
  }
}
