import express from 'express';
import { RegisterRoutes } from '.';
import { RunnerService } from '../services';
import { Runner } from '@prisma/client';

export const registerRunnerRoutes: RegisterRoutes<Runner, RunnerService> = (service) => {
    const router = express.Router();

    router.get('', async (req, res) => {
        try {
            const runners = await service.getAll();
            res.json(runners);
        } catch (error) {
            res.status(500).send('Error getting all runners');
        }
    });

    router.get('/search/:name', async (req, res) => {
        const name = req.params.name;
        try {
            const runners = await service.getByName(name);
            res.json(runners);
        } catch (error) {
            res.status(500).send(`Error getting runners by name "${name}"`);
        }
    });

    router.get('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        try {
            const runner = await service.getById(id);
            if (runner) {
                res.json(runner);
            } else {
                res.status(404).send(`No runner found with id "${id}"`);
            }
        } catch (error) {
            res.status(500).send(`Error getting runner by id "${id}"`);
        }
    });

    return router;
}