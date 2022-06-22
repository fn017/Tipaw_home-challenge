import { Router } from "express";

interface defaultRouteInstance {
  path: string;
  route: Router;
}
export type defaultRoutes = Array<defaultRouteInstance>;
