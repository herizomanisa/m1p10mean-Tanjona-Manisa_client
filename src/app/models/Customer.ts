export interface Customer {
  _id: string;
  image: string | null;
  nom: string;
  prenom: string;
  tel: string;
  email: string;
  addresse: string | null;
  mdp: string;
  created_at: Date;
}
