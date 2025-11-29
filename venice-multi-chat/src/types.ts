export interface ModelConfig {
  id: string;
  name: string;
  temperature: number;
  maxTokens: number;
  webSearch: boolean;
  isSelected?: boolean;
}

export interface ModelResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ModelInfo {
  id: string;
  type: string;
  object: string;
  created: number;
  owned_by: string;
  model_spec: {
    availableContextTokens: number;
    constraints: {
      promptCharacterLimit: number;
      widthHeightDivisor: number;
      steps: {
        default: number;
        max: number;
      };
    };
    capabilities: {
      optimizedForCode: boolean;
      supportsFunctionCalling: boolean;
      supportsResponseSchema: boolean;
      supportsWebSearch: boolean;
      supportsReasoning: boolean;
      supportsVision: boolean;
    };
    traits: string[];
    modelSource: string;
    beta: boolean;
    offline: boolean;
  };
} 