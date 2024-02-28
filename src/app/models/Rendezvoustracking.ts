export interface Rendezvoustracking {
  _id: string;
  is_valid: number;
  created_at: Date;
  id_customer: string;
  id_service: string;
  id_employe: string;
  date_heure: Date;
  payment?: any;
  service?: any;
  employe?: any;
  status: string;
}
