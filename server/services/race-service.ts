import { Race } from '@prisma/client';
import { Service } from '.';

export class RaceService extends Service<Race> {
    async getAll(): Promise<Race[]> {
        try {
            return await this.prisma.race.findMany();
        } catch (error) {
            console.error('Error getting all races:', error);
            throw error;
        }
    }

    async getById(id: number): Promise<Race | null> {
        try {
            return await this.prisma.race.findUnique({
                where: { id },
            });
        } catch (error) {
            console.error(`Error getting race by id "${id}":`, error);
            throw error;
        }
    }

    async getByName(name: string): Promise<Race[]> {
        try {
            return await this.prisma.race.findMany({
                where: { name: { startsWith: name } },
            });
        } catch (error) {
            console.error(`Error getting races by name "${name}":`, error);
            throw error;
        }
    }
}