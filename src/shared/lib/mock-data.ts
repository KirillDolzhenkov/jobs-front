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