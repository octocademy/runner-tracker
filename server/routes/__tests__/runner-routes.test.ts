import { registerRunnerRoutes } from '../runner-routes';
import { RunnerService } from '../../services/runner-service';
import express from 'express';
import request from 'supertest';
import { mock, MockProxy } from 'jest-mock-extended';
import { Runner } from '@prisma/client';

let runnerService: MockProxy<RunnerService> & RunnerService;
let app: express.Express;

let runners: Runner[] = [
    { 
        id: 1,
        name: 'Runner One',
    },
    { 
        id: 2,
        name: 'Runner Two',
    },
];

beforeEach(() => {
    runnerService = mock<RunnerService>();

    app = express();
    app.use(express.json());
    app.use(registerRunnerRoutes(runnerService));
});

describe('Runner routes', () => {
    describe('GET /', () => {
        test('returns all runners', async () => {
            runnerService.getAll.mockResolvedValue(runners);

            const response = await request(app).get('');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(runners);
        });

        test('returns 500 if error getting data', async () => {
            runnerService.getAll.mockRejectedValue('error');

            const response = await request(app).get('');

            expect(response.status).toBe(500);
        });
    });

    describe('GET /search/:name', () => {
        test('returns runners by name', async () => {
            const runner = runners[0];
            const nameSearchRunners = [runner];
            runnerService.getByName.mockResolvedValue(nameSearchRunners);
            const name = runner.name;

            const response = await request(app).get(`/search/${name}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(nameSearchRunners);
        });

        test('returns 500 if error getting data', async () => {
            runnerService.getByName.mockRejectedValue('error');
            const name = runners[0].name;

            const response = await request(app).get(`/search/${name}`);

            expect(response.status).toBe(500);
        });
    });

    describe('GET /:id', () => {
        test('returns runner by id', async () => {
            const runner = runners[0];
            runnerService.getById.mockResolvedValue(runner);

            const response = await request(app).get(`/${runner.id}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(runner);
        });

        test('returns 404 if runner not found', async () => {
            const id = 1;
            runnerService.getById.mockResolvedValue(null);

            const response = await request(app).get(`/${id}`);

            expect(response.status).toBe(404);
        });

        test('returns 500 if error getting data', async () => {
            const id = 1;
            runnerService.getById.mockRejectedValue('error');

            const response = await request(app).get(`/${id}`);

            expect(response.status).toBe(500);
        });
    });
});
