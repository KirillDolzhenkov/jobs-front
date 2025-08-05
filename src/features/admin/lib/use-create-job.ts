import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiSchema } from '@/shared/types/schema';
import { addCompanyToStorage } from '@/shared/lib/mock-data';

export const useCreateCompany = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newCompany: Omit<ApiSchema.Company, 'id'>) => {
            const companyWithId: ApiSchema.Company = {
                ...newCompany,
                id: Date.now().toString(), // Простая генерация ID
            };
            
            addCompanyToStorage(companyWithId);
            return companyWithId;
        },
        onSuccess: () => {
            // Инвалидируем кеш компаний чтобы обновить данные
            queryClient.invalidateQueries({ queryKey: ['companies'] });
        },
    });
};