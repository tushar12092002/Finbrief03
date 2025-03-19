// services/ai-service.js
const geminiService = require('./llm');
const groqService = require('./groq');

const applyStyleContext = (prompt, preferences) => {
  const styleMap = {
    technical: "Use technical financial terminology and detailed analysis",
    concise: "Provide concise bullet points with key metrics",
    narrative: "Create narrative explanations with real-world examples",
    visual: "Focus on chart-ready data and visualization suggestions"
  };
  
  return `${styleMap[preferences.style] || ''} 
          Context: ${preferences.profession} analysis
          ${prompt}`;
};

module.exports = {
  analyzeFinancialData: async (preferences, filePath) => {
    const basePrompt = `Analyze this financial data considering: 
                       - Professional context: ${preferences.profession}
                       - Preferred style: ${preferences.style}`;

    const fullPrompt = applyStyleContext(basePrompt, preferences);

    if (preferences.modelType === 'gemini-2.0-flash') {
      return geminiService.analyzeFinancialData(
        filePath, 
        preferences.temperature,
        fullPrompt
      );
    }
    if (preferences.modelType === 'mixtral-8x7b-32768') {
      return groqService.analyzeFinancialData(
        filePath,
        preferences.temperature,
        fullPrompt
      );
    }
    throw new Error('Invalid model type in preferences');
  },

  // Similar modifications for other functions
  queryFinancialData: async (preferences, filePath, userQuery) => {
    // Implementation using preferences
  },

  compareFinancialData: async (preferences, filePaths) => {
    // Implementation using preferences
  }
};