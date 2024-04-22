import { PrismaClient } from '@prisma/client';

export abstract class Service<T> {
    private _prisma: PrismaClient;
    constructor(prismaClient?: PrismaClient) {
        this._prisma = prismaClient || new PrismaClient();
    }

    // prisma property
    get prisma() {
        return this._prisma;
    }

    abstract getAll(): Promise<T[]>;
    abstract getById(id: number): Promise<T | null>;
}
