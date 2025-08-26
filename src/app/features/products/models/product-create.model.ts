export interface ProductCreate {
  companyId: number;
  name: string;
  brand: string;
  description: string;
  materialType: string;
  weight?: number;
  recyclable: boolean;
  recyclingInstructions: string;
  imageUrl: string;
}
