export interface Employe {
  _id: string;
  image?: string;
  nom: string;
  prenom: string;
  tel: string;
  email: string;
  addresse: string;
  mdp: string;
  heure_debut: string;
  heure_fin: string;
  is_activated?: boolean;
  created_at?: Date;
  sexe: string;
  is_prefered?: boolean;
}
