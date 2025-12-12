export interface AgentProductSearchResponse {
  message?: string;
  categories?: string[];
  status?: AgentProductSearchStatus;
  input_text?: string;
}

export enum AgentProductSearchStatus {
  FOUND = "FOUND",
  NOT_FOUND = "NOT_FOUND",
  SIMILAR = "SIMILAR",
}
