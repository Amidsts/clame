export interface AgentProductSearchResponse {
    message?: string;
    categories?: string[];
    status?: AgentProductSearchStatus;
    input_text?: string;
}

type AgentProductSearchStatus = 'FOUND' | 'NOT_FOUND' | 'SIMILAR';