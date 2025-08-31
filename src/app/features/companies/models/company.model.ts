
export interface Company {
    id: number;
    name: string;
    email: string;
    contactPerson?: string | null;
    phone?: string | null;
    address?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface CompanyCreateDTO {
    name: string;
    email: string;
    contactPerson?: string | null;
    phone?: string | null;
    address?: string | null;
}
