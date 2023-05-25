interface IEnableOnLeangthGreaterThan {
  lengthGreaterThan: number;
  targetId: string;
  enabled: boolean;
}

interface IVisibleOnEqual {
  eq: string;
  targetId: string;
  visibility: string;
}

interface IEnableOnEqual {
  eq: string;
  targetId: string;
  enabled: boolean;
}

export type ICondition = IEnableOnLeangthGreaterThan | IEnableOnEqual | IVisibleOnEqual;
