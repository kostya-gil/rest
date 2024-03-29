import { Router, NextFunction } from 'express';

type Wrapper = ((router: Router) => void);

export const applyMiddleware = (
  middleware: Wrapper[],
  router: Router
) => {
  for (const f of middleware) {
    f(router);
  }
};

type Handler = (
    req: any,
    res: any,
    next: NextFunction,
) => Promise<void> | void;
  
type Route = {
    path: string;
    method: string;
    handler: Handler | Handler[];
};
  
export const applyRoutes = (routes: Route[], router: Router) => {
    for (const route of routes) {
        const { method, path, handler } = route;
        (router as any)[method](path, handler);
    }
};
