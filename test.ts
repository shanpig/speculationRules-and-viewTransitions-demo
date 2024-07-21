type ID = string;

type NavigationHistoryEntry = {
  id: string;
  index: number;
  key: string;
  ondispose: any;
  sameDocument: boolean;
  url: string;
};

type NavigationActivation = {
  from: NavigationHistoryEntry;
  entry: NavigationHistoryEntry;
  navigationType: "traverse" | "push" | "pop";
};
