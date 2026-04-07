#!/usr/bin/env bun
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const PROVIDERS_DIR = './providers';
const MODELS_API_URL = 'https://models.dev/api.json';

async function main() {
  console.log('Fetching models from models.dev...');
  const response = await fetch(MODELS_API_URL);
  const modelsData = await response.json();

  const providers = ['anthropic', 'openai', 'openrouter'];

  for (const providerId of providers) {
    const providerFile = join(PROVIDERS_DIR, `${providerId}.json`);
    
    try {
      const providerData = JSON.parse(readFileSync(providerFile, 'utf-8'));
      
      const providerModels = modelsData[providerId]?.models || {};
      
      // Filter out non-chat models (embedding, image generation, etc.)
      const filteredModels = [];
      for (const [modelId, modelData] of Object.entries(providerModels)) {
        const family = modelData?.family || '';
        const modalities = modelData?.modalities || {};
        const outputModalities = modalities.output || {};
        const outputArray = Array.isArray(outputModalities) ? outputModalities : [];
        
        // Skip embedding models
        if (family === 'text-embedding' || modelId.includes('embedding')) {
          continue;
        }
        
        // Skip image generation models (flux, riverflow, seedream, -image)
        if (modelId.includes('flux') || 
            modelId.includes('riverflow') || 
            modelId.includes('seedream') ||
            modelId.includes('-image')) {
          continue;
        }
        
        filteredModels.push(modelId);
      }
      
      const modelNames = filteredModels.sort();

      console.log(`\n${providerId}: Found ${modelNames.length} models (filtered)`);
      
      // Update models field
      providerData.models = {};
      for (const model of modelNames) {
        providerData.models[model] = {};
      }

      // Write back to file
      writeFileSync(providerFile, JSON.stringify(providerData, null, 2) + '\n');
      console.log(`✅ Updated ${providerFile}`);
      
    } catch (error) {
      console.error(`❌ Error processing ${providerId}:`, error.message);
    }
  }

  console.log('\n🎉 All providers updated!');
}

main().catch(console.error);
