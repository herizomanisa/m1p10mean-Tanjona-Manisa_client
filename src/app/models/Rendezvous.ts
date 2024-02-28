export interface Rendezvous {
  _id: string;
  id_customer: string;
  id_service: string;
  idemploye?: string | null;
  date_heure: Date;
  isValid: number;
  created_at: Date;
}
