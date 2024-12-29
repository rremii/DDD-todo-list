import "reflect-metadata";
import "reflect-metadata/lite";

import { TodoListService } from "./modules/Todo/services/todoList.service";
import { TodoListRepository } from "./modules/Todo/repositories/todoList.repository";
import { TodoRepository } from "./modules/Todo/repositories/todo.repository";
import { container } from "./modules/IoC";

container.init([TodoListService, TodoListRepository, TodoRepository]);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
