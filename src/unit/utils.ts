import { Unit } from './entities/unit.entity';

export const buildUnitsNesting = (units: Unit[]) => {
  const map = new Map(units.map((u) => [u.id, { ...u, children: [] }]));

  for (const unit of map.values()) {
    if (unit.parent) {
      map.get(unit.parent.id)!.children.push(unit);
    }
  }

  const roots = [...map.values()].filter((u) => !u.parent);

  return roots;
};
