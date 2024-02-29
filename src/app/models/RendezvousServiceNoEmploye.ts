import { Customer } from './Customer';
import { Service } from './Service';

export interface RendezvousServiceNoEmploye {
  _id: string;
  id_customer: string;
  id_service: string;
  date_heure: Date;
  is_valid: number;
  created_at: Date;
  services: Service;
  customers: Customer;
}
