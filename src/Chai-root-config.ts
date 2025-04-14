import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  async loadApp({ name }) {
    try {
      const module = name === "@single-spa/welcome"
        ? await import(/* webpackIgnore: true */ name)
        : await System.import(/* webpackIgnore: true */ name);
      return module;
    } catch (error) {
      console.error(`Erro ao carregar o micro front-end "${name}"`, error);
      
      return {
        mount: () => {
          document.body.innerHTML = `<h1>Falha ao carregar a aplicação ${name}</h1>`;
        },
        unmount: () => {},
      };
    }
  },
});

const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
