import { Runner } from '@prisma/client';
import { Service } from '.';

export class RunnerService extends Service<Runner> {
    async getAll(): Promise<Runner[]> {
        try {
            return await this.prisma.runner.findMany();
        } catch (error) {
            console.error('Error getting all runners:', error);
            throw error;
        }
    }

    async getById(id: number): Promise<Runner | null> {
        try {
            return await this.prisma.runner.findUnique({
                where: { id },
            });
        } catch (error) {
            console.error(`Error getting runner by id "${id}":`, error);
            throw error;
        }
    }

    async getByName(name: string): Promise<Runner[]> {
        try {
            return await this.prisma.runner.findMany({
                where: { name: { startsWith: name } },
            });
        } catch (error) {
            console.error(`Error getting runners by name "${name}":`, error);
            throw error;
        }
    }
}