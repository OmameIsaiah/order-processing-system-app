import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  // Define base URLs
  readonly ORDER_SERVICE_BASE_URL = 'http://localhost:2003/order-service/api/v1';
  readonly ACCOUNT_SERVICE_BASE_URL = 'http://localhost:2001/account-service/api/v1/users';

  constructor() {}
}