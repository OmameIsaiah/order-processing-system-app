import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'; 


@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  //readonly ORDER_SERVICE_BASE_URL = 'http://localhost:2003/order-service/api/v1';
  //readonly ACCOUNT_SERVICE_BASE_URL = 'http://localhost:2001/account-service/api/v1/users';

   // Use environment variables
  readonly ORDER_SERVICE_BASE_URL = environment.ORDER_SERVICE_BASE_URL;
  readonly ACCOUNT_SERVICE_BASE_URL = environment.ACCOUNT_SERVICE_BASE_URL;
 
  constructor() {}
}