import { useEffect, useRef, useState } from "react";
import { container } from "..";
import { BaseConstructor } from "../types";

export function useContainer<T extends BaseConstructor>(Entity: T) {
  const [entity] = useState<InstanceType<T>>(() => container.get(Entity));

  return entity;
}
