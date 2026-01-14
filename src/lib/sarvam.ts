const { SarvamAIClient } = require("sarvamai");

const client = new SarvamAIClient({
  apiSubscriptionKey: "sk_k1pbkh1n_Tzh1rlI89vDltV4NAX8JWxMc"
});

const languageMap = {
  'en': 'en-IN',
  'hi': 'hi-IN', 
  'pa': 'pa-IN',
  'gu': 'gu-IN'
};

export async function translateText(text: string, targetLanguage: string): Promise<string> {
  if (targetLanguage === 'en' || !text.trim()) return text;
  
  try {
    const response = await client.text.translate({
      input: text,
      source_language_code: "en-IN",
      target_language_code: languageMap[targetLanguage as keyof typeof languageMap] || "hi-IN",
      mode: "formal",
      model: "sarvam-translate:v1",
      numerals_format: "native",
      speaker_gender: "Male",
      enable_preprocessing: false
    });
    
    return response.translated_text || text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}