import "reflect-metadata";
// import "reflect-metadata/lite";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// import * as fs from "fs";

export const CLASS_KEY = "ioc:tagged_class";

export class Container {
  bindMap = new Map();

  bind(identifier: string, clazz: any, constructorArgs?: Array<any>) {
    this.bindMap.set(identifier, {
      clazz,
      constructorArgs: constructorArgs || [],
    });
  }

  get<T>(identifier: string): T {
    const target = this.bindMap.get(identifier);
    const { clazz, constructorArgs } = target;
    const props = Reflect.getMetadata(PROPS_KEY, clazz);
    const inst = Reflect.construct(clazz, constructorArgs);
    for (let prop in props) {
      const identifier = props[prop].value;
      // get injected object recursively
      inst[prop] = this.get(identier);
    }
    return inst;
  }
}

// export function load(container) {
//   // The container is the global IoC container
//   const list = fs.readdirSync("./");
//   for (const file of list) {
//     if (/\.ts$/.test(file)) {
//       const exports = require(`./${file}`);
//       for (const m in exports) {
//         const module = exports[m];
//         if (typeof module === "function") {
//           const metadata = Reflect.getMetadata(CLASS_KEY, module);
//           // register
//           if (metadata) {
//             container.bind(metadata.id, module, metadata.args);
//           }
//         }
//       }
//     }
//   }
// }

export function Provider(identifier: string, args?: Array<any>) {
  return function (target: any) {
    Reflect.defineMetadata(
      CLASS_KEY,
      {
        id: identifier,
        args: args || [],
      },
      target
    );
    return target;
  };
}

export const PROPS_KEY = "ioc:inject_props";

export function Inject() {
  return function (target: any, targetKey: string) {
    const annotationTarget = target.constructor;

    let props = {};
    if (Reflect.hasOwnMetadata(PROPS_KEY, annotationTarget)) {
      props = Reflect.getMetadata(PROPS_KEY, annotationTarget);
    }

    props[targetKey] = {
      value: targetKey,
    };

    Reflect.defineMetadata(PROPS_KEY, props, annotationTarget);
  };
}

@Provider("b", [10])
class B {
  constructor(p: number) {
    this.p = p;
  }
}

// a.ts

@Provider("a")
class A {
  @Inject()
  private b: B;
}

// main.ts
const container = new Container();
// load(container);

console.log(container.get("a"));
