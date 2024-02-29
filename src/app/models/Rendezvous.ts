export interface Rendezvous {
  _id: string;
  id_customer: string;
  id_service: string;
  id_employe?: string | null;
  date_heure: Date;
  is_valid: number;
  created_at: Date;
}
