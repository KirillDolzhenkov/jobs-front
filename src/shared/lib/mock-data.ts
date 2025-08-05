import { ApiSchema } from '@/shared/types/schema';

export const mockCompanies: ApiSchema.Company[] = [
    {
        id: '1',
        name: 'Tech Corp',
        description: 'A leading tech company innovating in AI solutions.',
        logoUrl: '/logos/tech-corp.png',
        slug: 'tech-corp',
    },
    {
        id: '2',
        name: 'Green Energy Ltd',
        description: 'Sustainable energy solutions for a better future.',
        logoUrl: '/logos/green-energy.png',
        slug: 'green-energy',
    },
];

export const mockTags: ApiSchema.Tag[] = [
    { id: '1', name: 'tech', slug: 'tech' },
    { id: '2', name: 'remote', slug: 'remote' },
];

export const mockJobs: ApiSchema.Job[] = [
    {
        id: '1',
        title: 'Senior AI Engineer',
        description: 'Develop AI solutions for global clients.',
        slug: 'senior-ai-engineer',
        company: mockCompanies[0],
        tags: [mockTags[0], mockTags[1]],
        location: 'Poland',
        applyUrl: 'https://apply.techcorp.com/senior-ai',
        postedAt: '2025-08-01T12:00:00Z',
        expireAt: '2025-09-01T12:00:00Z',
        isPublished: true,
    },
    {
        id: '2',
        title: 'Renewable Energy Consultant',
        description: 'Advise on green energy projects.',
        slug: 'renewable-energy-consultant',
        company: mockCompanies[1],
        tags: [mockTags[0]],
        location: 'Brazil',
        applyUrl: 'https://apply.greenenergy.com/consultant',
        postedAt: '2025-08-02T09:00:00Z',
        isPublished: true,
    },
];

export const fetchCompanies = async (): Promise<ApiSchema.Company[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockCompanies;
};

export const fetchJobs = async (): Promise<ApiSchema.Job[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockJobs;
};

// Функция для работы с localStorage и моковыми данными
export const getCompaniesFromStorage = (): ApiSchema.Company[] => {
    if (typeof window !== 'undefined') {
        const cachedData = localStorage.getItem('mockCompanies');
        if (cachedData) {
            try {
                return JSON.parse(cachedData);
            } catch (error) {
                console.error('Error parsing cached data:', error);
            }
        }
        
        // Если данных нет, инициализируем localStorage
        localStorage.setItem('mockCompanies', JSON.stringify(mockCompanies));
        return mockCompanies;
    }
    
    // Fallback для SSR
    return mockCompanies;
};

// Функция для обновления компании в localStorage
export const updateCompanyInStorage = (updatedCompany: ApiSchema.Company): void => {
    if (typeof window !== 'undefined') {
        const companies = getCompaniesFromStorage();
        const index = companies.findIndex(c => c.id === updatedCompany.id);
        
        if (index !== -1) {
            companies[index] = updatedCompany;
            localStorage.setItem('mockCompanies', JSON.stringify(companies));
        }
    }
};

// Функция для добавления новой компании в localStorage
export const addCompanyToStorage = (newCompany: ApiSchema.Company): void => {
    if (typeof window !== 'undefined') {
        const companies = getCompaniesFromStorage();
        companies.push(newCompany);
        localStorage.setItem('mockCompanies', JSON.stringify(companies));
    }
};

// Функция для удаления компании из localStorage
export const deleteCompanyFromStorage = (id: string): void => {
    if (typeof window !== 'undefined') {
        const companies = getCompaniesFromStorage();
        const filteredCompanies = companies.filter(c => c.id !== id);
        localStorage.setItem('mockCompanies', JSON.stringify(filteredCompanies));
    }
};