# 推理服务提供商注册表

AI 模型提供商及其支持模型的集中注册表，通过 GitHub raw URLs 访问。

中文 | [**English**](README.md)

## API 接口

### 注册表 API

获取所有提供商及其模型的 JSON 文件：

```bash
curl https://raw.githubusercontent.com/AkaraChen/inference-provider-registry/main/v1/registry.json
```

### 提供商 API

获取单个提供商配置：

```bash
curl https://raw.githubusercontent.com/AkaraChen/inference-provider-registry/main/v1/providers/openai.json
curl https://raw.githubusercontent.com/AkaraChen/inference-provider-registry/main/v1/providers/anthropic.json
curl https://raw.githubusercontent.com/AkaraChen/inference-provider-registry/main/v1/providers/openrouter.json
```

### Schema

获取提供商配置的 JSON Schema 定义：

```bash
curl https://raw.githubusercontent.com/AkaraChen/inference-provider-registry/main/v1/providers/schema.json
```

## 数据结构

### 提供商对象

```json
{
  "name": {
    "zh-CN": "提供商名称",
    "en": "Provider Name"
  },
  "description": {
    "zh-CN": "提供商描述",
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
    "模型名称": {}
  }
}
```

### 支持的提供商

- **OpenAI** - GPT 系列，包括 GPT-4.1、GPT-5 和 O 系列模型
- **Anthropic** - Claude 系列，包括 Claude 3.5、Claude 4 和 Claude 5 系列
- **OpenRouter** - 统一访问多个 AI 模型提供商
- **Kimi Code** - 月之暗面的代码模型
- **百炼 Coding Plan** - 阿里云的编程订阅服务
- **方舟 Coding Plan** - 火山引擎的编程订阅服务

## 使用示例

```javascript
// 获取所有提供商
const response = await fetch('https://raw.githubusercontent.com/AkaraChen/inference-provider-registry/main/v1/registry.json');
const registry = await response.json();

// 访问提供商信息
const openai = registry.openai;
console.log(openai.name.zh-CN); // "OpenAI"
console.log(openai.endpoints.default.openai); // "https://api.openai.com/v1"
console.log(Object.keys(openai.models)); // 支持的模型数组
```

## 添加新提供商

1. 在 `v1/providers/` 目录下按照 schema 创建新的 JSON 文件
2. 将提供商添加到 `v1/registry.json`
3. 运行验证脚本（如果可用）

## 许可证

MIT
