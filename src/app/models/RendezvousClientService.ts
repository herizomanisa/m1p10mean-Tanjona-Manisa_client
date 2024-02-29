import { Customer } from './Customer';
import { Service } from './Service';

export interface RendezvousClientService {
  _id: string;
  id_customer: Customer;
  id_service: Service;
  id_employe?: string | null;
  date_heure: Date;
  is_valid: number;
  created_at: Date;
}
