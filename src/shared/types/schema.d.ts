export declare namespace ApiSchema {
    export interface Company {
        id: string;
        name: string;
        description?: string;
        logoUrl?: string;
        slug: string;
    }

    export interface Tag {
        id: string;
        name: string;
        slug: string;
    }

    export interface Job {
        id: string;
        title: string;
        description?: string;
        slug: string;
        company: Company;
        tags: Tag[];
        location?: string;
        applyUrl?: string;
        postedAt: string;
        expireAt?: string;
        isPublished: boolean;
    }
}