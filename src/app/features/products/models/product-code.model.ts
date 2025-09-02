export interface ProductCode {
    id: number;
    productId: number;
    uuidCode: string;
    batchNumber: string;
    isActive: boolean;
    generatedAt: Date;
}

// En el frontend, actualizar la interfaz
export interface ProductCodeWithProduct {
  id: number;
  productId: number;
  uuidCode: string;
  batchNumber: string;
  isActive: boolean;
  generatedAt: Date;
  productName: string;
  productBrand: string;
  materialType: string;
  companyName: string;
}
