export interface Company {
    id: string;
    name: string;
    description: string;
}

export const mockCompanies: Company[] = [
    {
        id: '1',
        name: 'Tech Corp',
        description: 'A leading tech company innovating in AI solutions.',
    },
    {
        id: '2',
        name: 'Green Energy Ltd',
        description: 'Sustainable energy solutions for a better future.',
    },
    {
        id: '3',
        name: 'Green Energy Ltd',
        description: 'Sustainable energy solutions for a better future.',
    },
    {
        id: '4',
        name: 'Green Energy Ltd',
        description: 'Sustainable energy solutions for a better future.',
    },
];

export const fetchCompanies = async (): Promise<Company[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Имитация задержки
    return mockCompanies;
};

export const createCompany = async (data: Omit<Company, 'id'>): Promise<Company> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { id: Math.random().toString(), ...data };
};