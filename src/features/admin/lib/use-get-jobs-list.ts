import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiSchema } from '@/shared/types/schema';
import { updateCompanyInStorage } from '@/shared/lib/mock-data';

export const useUpdateCompany = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updatedCompany: ApiSchema.Company) => {
            updateCompanyInStorage(updatedCompany);
            return updatedCompany;
        },
        onSuccess: (updatedCompany) => {
            // Обновляем кеш для конкретной компании
            queryClient.setQueryData(['companies', updatedCompany.id], updatedCompany);
            // Инвалидируем общий список компаний
            queryClient.invalidateQueries({ queryKey: ['companies'] });
        },
    });
};