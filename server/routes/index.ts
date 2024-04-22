import { registerRaceRoutes } from "./race-routes";
import * as services from '../services';
import express from 'express';

type RegisterRoutes<TObject, TService extends services.Service<TObject>> = (service: TService) => express.Router;

export {
    RegisterRoutes,
    registerRaceRoutes,
}