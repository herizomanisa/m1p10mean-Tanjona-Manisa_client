import { Customer } from './Customer';
import { Service } from './Service';
import { Employe } from './Employe';

export interface RendezvousServiceEmploye {
  _id: string;
  id_customer: string;
  id_service: string;
  id_employe?: string | null;
  date_heure: Date;
  is_valid: number;
  created_at: Date;
  service?: Service;
  employe?: Employe;
  customer?: Customer;
}
