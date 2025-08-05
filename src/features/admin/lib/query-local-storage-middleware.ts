import { QueryClient } from '@tanstack/react-query';
import { ApiSchema } from '@/shared/types/schema';

const LOCAL_STORAGE_KEY = 'mockCompanies';

// Моковые данные для инициализации
const initialMockData: ApiSchema.Company[] = [
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

export const createLocalStorageMiddleware = (enabled: boolean = true) => {
    return (client: QueryClient) => {
        // Инициализация localStorage с моковыми данными при первом запуске
        if (typeof window !== 'undefined' && enabled) {
            const existingData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (!existingData) {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialMockData));
            }
            
            // Инициализируем кеш TanStack Query с данными из localStorage
            const cachedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (cachedData) {
                try {
                    const parsedData = JSON.parse(cachedData);
                    client.setQueryData(['companies'], parsedData);
                } catch (error) {
                    console.error('Error parsing cached data:', error);
                    // Если данные повреждены, используем начальные данные
                    client.setQueryData(['companies'], initialMockData);
                }
            }
        }

        // Перехватываем fetchQuery для запросов компаний
        const originalFetchQuery = client.fetchQuery;
        client.fetchQuery = function (options: any) {
            const queryKey = options.queryKey;
            
            if (enabled && Array.isArray(queryKey) && queryKey[0] === 'companies') {
                // Возвращаем данные из localStorage вместо реального запроса
                const cachedData = localStorage.getItem(LOCAL_STORAGE_KEY);
                if (cachedData) {
                    try {
                        const parsedData = JSON.parse(cachedData);
                        return Promise.resolve(parsedData);
                    } catch (error) {
                        console.error('Error parsing cached data:', error);
                        return Promise.resolve(initialMockData);
                    }
                }
                return Promise.resolve(initialMockData);
            }
            
            return originalFetchQuery.call(this, options);
        };

        // Перехватываем setQueryData для сохранения в localStorage
        const originalSetQueryData = client.setQueryData;
        client.setQueryData = function (queryKey: any, updater: any, options?: any) {
            const result = originalSetQueryData.call(this, queryKey, updater, options);

            if (enabled && Array.isArray(queryKey) && queryKey[0] === 'companies') {
                try {
                    const data = typeof updater === 'function' ? updater(client.getQueryData(queryKey)) : updater;
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
                } catch (error) {
                    console.error('Error saving to localStorage:', error);
                }
            }
            return result;
        };

        return client;
    };
};