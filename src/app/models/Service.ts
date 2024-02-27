export interface Service {
  _id: string;
  nom: string;
  prix: number;
  duree: number;
  commission: number;
  created_at: Date;
  is_prefered?: boolean;
}
