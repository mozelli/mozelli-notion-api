import Express from "express";
import UserController from "./controllers/UsersController";
import AuthController from "./controllers/AuthController";

const route = Express.Router();

route.post("/user", async (request, response) => new UserController(request, response).create());
route.get("/user", async (request, response) => new UserController(request, response).getAll());
route.get("/user/:id", async (request, response) => new UserController(request, response).getById());
route.put("/user", async (request, response) => new UserController(request, response).update());
route.delete("/user/:id", async (request, response) => new UserController(request, response).delete());

route.post("/login", async (request, response) => new AuthController(request, response).login());

export { route };