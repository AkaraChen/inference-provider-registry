# Inference Provider Registry

A centralized registry for AI model providers and their supported models, accessible via GitHub raw URLs.

[**中文文档**](README.zh-CN.md) | English

## API Endpoints

### Registry API

Get all providers and their models in a single JSON file:

```bash
curl https://raw.githubusercontent.com/AkaraChen/inference-provider-registry/main/v1/registry.json
```

### Provider APIs

Get individual provider configuration:

```bash
curl https://raw.githubusercontent.com/AkaraChen/inference-provider-registry/main/v1/providers/openai.json
curl https://raw.githubusercontent.com/AkaraChen/inference-provider-registry/main/v1/providers/anthropic.json
curl https://raw.githubusercontent.com/AkaraChen/inference-provider-registry/main/v1/providers/openrouter.json
```

### Schema

Get the JSON schema definition for provider configurations:

```bash
curl https://raw.githubusercontent.com/AkaraChen/inference-provider-registry/main/v1/providers/schema.json
```

## Data Structure

### Provider Object

```json
{
  "name": {
    "zh-CN": "Provider Name",
    "en": "Provider Name"
  },
  "description": {
    "zh-CN": "Provider description",
    "en": "Provider description"
  },
  "docs": {
    "zh-CN": "https://docs.url",
    "en": "https://docs.url"
  },
  "dashboard": "https://dashboard.url",
  "endpoints": {
    "default": {
      "openai": "https://api.openai.com/v1",
      "anthropic": "https://api.anthropic.com/v1"
    }
  },
  "models": {
    "model-name": {}
  }
}
```

### Supported Providers

- **OpenAI** - GPT models including GPT-4.1, GPT-5, and O-series models
- **Anthropic** - Claude models including Claude 3.5, Claude 4, and Claude 5 series
- **OpenRouter** - Unified access to multiple AI model providers
- **Kimi Code** - Moonshot AI's coding models
- **Dashscope Coding Plan** - Alibaba's coding subscription service
- **Ark Coding Plan** - Volcengine's coding subscription service

## Usage Example

```javascript
// Fetch all providers
const response = await fetch('https://raw.githubusercontent.com/AkaraChen/inference-provider-registry/main/v1/registry.json');
const registry = await response.json();

// Access provider information
const openai = registry.openai;
console.log(openai.name.en); // "OpenAI"
console.log(openai.endpoints.default.openai); // "https://api.openai.com/v1"
console.log(Object.keys(openai.models)); // Array of supported models
```

## Adding a New Provider

1. Create a new JSON file in `v1/providers/` following the schema
2. Add the provider to `v1/registry.json`
3. Run the validation script (if available)

## License

MIT
