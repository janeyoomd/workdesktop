import { defineAgent } from "eve";

export default defineAgent({
  model: "anthropic/claude-sonnet-5",
  // Explicit context window bypasses the AI Gateway catalog lookup.
  // Remove this line once AI_GATEWAY_API_KEY is set and the gateway can
  // resolve the model metadata automatically.
  modelContextWindowTokens: 200_000,
});
