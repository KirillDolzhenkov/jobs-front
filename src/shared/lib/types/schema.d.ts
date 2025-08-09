export interface Company {
    id: string;
    name: string;
    description?: string;
    logoUrl?: string;
    slug: string;
    createdAt?: string;
    updatedAt?: string;
}

interface Job {
    id: string;
    title: string;
    description: string;
    slug: string;
    location: string;
    salaryMin?: number;
    salaryMax?: number;
    isRemote?: boolean;
    postedAt: string;
    expireAt: string;
    companyId: string;
    companyName?: string;
    applyUrl?: string;
    logoUrl?: string;
    tagIds?: string[];
}

export interface PaginatedResponse<T> {
    meta: {
        total: number;
        page: number;
        size: number;
    };
    data: T[];
}