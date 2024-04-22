import { MockContext, createMockContext } from './mock-context';
import { RunnerService } from '../runner-service';
import { Runner } from '@prisma/client';

let mockContext: MockContext;
let runnerService: RunnerService;
let runners: Runner[];

beforeEach(() => {
    mockContext = createMockContext();
    runnerService = new RunnerService(mockContext.prisma);
    runners = [
        { id: 1, name: 'Runner One' },
        { id: 2, name: 'Runner Two' }
    ];
});

describe('RunnerService', () => {
    describe('getAll', () => {
        test('should return all runners', async () => {
            mockContext.prisma.runner.findMany.mockResolvedValue(runners);
            const result = await runnerService.getAll();
            expect(result).toEqual(runners);
            expect(mockContext.prisma.runner.findMany).toHaveBeenCalled();
        });

        test('should handle errors', async () => {
            mockContext.prisma.runner.findMany.mockRejectedValue(new Error('Error fetching runners'));
            await expect(runnerService.getAll()).rejects.toThrow('Error fetching runners');
        });
    });

    describe('getById', () => {
        test('should return a runner by id', async () => {
            const runner = runners[0];
            mockContext.prisma.runner.findUnique.mockResolvedValue(runner);
            const result = await runnerService.getById(runner.id);
            expect(result).toEqual(runner);
            expect(mockContext.prisma.runner.findUnique).toHaveBeenCalledWith({ where: { id: runner.id } });
        });

        test('should handle errors', async () => {
            mockContext.prisma.runner.findUnique.mockRejectedValue(new Error('Error fetching runner by id'));
            await expect(runnerService.getById(1)).rejects.toThrow('Error fetching runner by id');
        });
    });

    describe('getByName', () => {
        test('should return runners by name', async () => {
            mockContext.prisma.runner.findMany.mockResolvedValue([runners[0]]);
            const result = await runnerService.getByName('Runner One');
            expect(result).toEqual([runners[0]]);
            expect(mockContext.prisma.runner.findMany).toHaveBeenCalledWith({ where: { name: { startsWith: 'Runner One' } } });
        });

        test('should handle errors', async () => {
            mockContext.prisma.runner.findMany.mockRejectedValue(new Error('Error fetching runners by name'));
            await expect(runnerService.getByName('Runner One')).rejects.toThrow('Error fetching runners by name');
        });
    });
});
