import React, { useState, useEffect } from 'react';
import { Settings, Key, Eye, EyeOff, Check, X, AlertCircle, Clock, Zap } from 'lucide-react';

const CHANGELOG = [
  {
    version: '1.3.0',
    date: 'Feb 2026',
    label: 'Current',
    changes: [
      'Completely redesigned mobile UI with fixed bottom navigation bar',
      'New mobile top header showing app brand and current view name',
      'Bottom nav shows icons + labels with a banana-yellow active indicator',
      'Character counter added to the Architect Chat input (2000 char limit)',
      'Quick-start suggestion chips in chat for instant inspiration',
      'Safe-area inset support for iOS notch and home indicator',
    ],
  },
  {
    version: '1.2.0',
    date: 'Feb 2026',
    label: null,
    changes: [
      'Build button now brings prompt to chat textarea for review & editing before sending',
      'Copy button in Style Gallery shows animated green checkmark on success',
      'New Custom Creations tab: build fully tailored prompts from scratch',
      'Custom Creations — Image Editor: upload PNG/WebP, extract text with vision AI, edit & regenerate via Nano Banana 2',
      'Settings: added version history & changelog',
    ],
  },
  {
    version: '1.1.0',
    date: 'Jan 2026',
    label: null,
    changes: [
      'Style Gallery with 165+ curated styles across multiple categories',
      'Category filtering and full-text search in gallery',
      'Architect Chat with real-time streaming responses',
      'Prompt Tester for direct image generation',
      'Model toggle: Nano Banana Pro vs. Nano Banana 2',
    ],
  },
  {
    version: '1.0.0',
    date: 'Dec 2025',
    label: null,
    changes: [
      'Initial release of Nano Banana Architect',
      'Core 8-area Prompt Canvas system',
      'Venice AI integration for text & image generation',
      'API key management with localStorage persistence',
    ],
  },
];

export const ApiKeySettings: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState<string>('');

  // Load API key from localStorage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('VENICE_API_KEY');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const validateApiKey = (key: string): boolean => {
    if (!key.trim()) {
      setValidationError('API key cannot be empty');
      return false;
    }
    if (key.length < 10) {
      setValidationError('API key seems too short');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleSave = async () => {
    if (!validateApiKey(apiKey)) {
      return;
    }

    setIsSaving(true);
    setSaveStatus('idle');

    try {
      // Test the API key by making a simple request
      const testResponse = await fetch('https://api.venice.ai/api/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey.trim()}`,
          'Content-Type': 'application/json'
        }
      });

      if (!testResponse.ok && testResponse.status === 401) {
        throw new Error('Invalid API key. Please check your key and try again.');
      }

      // Save to localStorage
      localStorage.setItem('VENICE_API_KEY', apiKey.trim());
      setSaveStatus('success');
      
      // Trigger storage event so other components can update
      window.dispatchEvent(new Event('storage'));
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error: any) {
      console.error('API key validation error:', error);
      setSaveStatus('error');
      setValidationError(error.message || 'Failed to validate API key. Please check your connection and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    localStorage.removeItem('VENICE_API_KEY');
    setApiKey('');
    setSaveStatus('idle');
    setValidationError('');
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = e.target.value;
    setApiKey(newKey);
    setSaveStatus('idle');
    if (validationError) {
      validateApiKey(newKey);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-obsidian-950 p-4 md:p-8">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-banana-400/20 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-banana-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">
              API <span className="text-banana-400">Settings</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base">
            Configure your Venice AI API key to use Nano Banana Pro. Your key is stored locally in your browser.
          </p>
        </div>

        {/* API Key Input Section */}
        <div className="bg-obsidian-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-banana-400" />
            <label htmlFor="api-key" className="text-sm font-semibold text-gray-300">
              Venice AI API Key
            </label>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <input
                id="api-key"
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={handleKeyChange}
                placeholder="Enter your Venice AI API key..."
                className="w-full px-4 py-3 pr-12 bg-obsidian-950 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-banana-400/50 focus:ring-1 focus:ring-banana-400/20 transition-all font-mono text-sm"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                title={showKey ? 'Hide key' : 'Show key'}
              >
                {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {validationError && (
              <div className="flex items-start gap-2 text-red-400 text-sm bg-red-900/20 border border-red-800/50 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {saveStatus === 'success' && (
              <div className="flex items-start gap-2 text-green-400 text-sm bg-green-900/20 border border-green-800/50 rounded-lg p-3">
                <Check className="w-4 h-4 mt-0.5 shrink-0" />
                <span>API key saved successfully!</span>
              </div>
            )}

            {saveStatus === 'error' && !validationError && (
              <div className="flex items-start gap-2 text-red-400 text-sm bg-red-900/20 border border-red-800/50 rounded-lg p-3">
                <X className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Failed to save API key. Please try again.</span>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4 space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
              <div className="text-sm text-blue-300 space-y-1">
                <p className="font-semibold">How to get your API key:</p>
                <ol className="list-decimal list-inside space-y-1 text-blue-200/80 ml-2">
                  <li>Visit <a href="https://venice.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">venice.ai</a></li>
                  <li>Sign up or log in to your account</li>
                  <li>Navigate to your API settings</li>
                  <li>Copy your API key and paste it here</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={isSaving || !apiKey.trim()}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                isSaving || !apiKey.trim()
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-banana-400 text-obsidian-950 hover:bg-banana-300 shadow-[0_0_15px_rgba(255,225,53,0.4)]'
              }`}
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin" />
                  Validating...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Save API Key
                </>
              )}
            </button>

            {apiKey && (
              <button
                onClick={handleClear}
                className="px-4 py-3 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg font-semibold transition-colors border border-gray-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Security Note */}
        <div className="bg-obsidian-900/50 border border-gray-800/50 rounded-lg p-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-400">Security:</strong> Your API key is stored locally in your browser's localStorage.
            It is never sent to our servers except when making API requests to Venice AI.
            Make sure to keep your API key secure and never share it publicly.
          </p>
        </div>

        {/* ── Version & Changelog ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-banana-400/10 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-banana-400" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Version <span className="text-banana-400">History</span>
            </h3>
          </div>

          <div className="space-y-4">
            {CHANGELOG.map((release) => (
              <div
                key={release.version}
                className={`bg-obsidian-900 border rounded-xl p-5 space-y-3 ${
                  release.label === 'Current'
                    ? 'border-banana-400/30 shadow-[0_0_15px_rgba(255,225,53,0.05)]'
                    : 'border-gray-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <Zap className={`w-4 h-4 ${release.label === 'Current' ? 'text-banana-400' : 'text-gray-600'}`} />
                      <span className={`font-bold font-mono text-sm ${release.label === 'Current' ? 'text-banana-400' : 'text-gray-300'}`}>
                        v{release.version}
                      </span>
                    </div>
                    {release.label && (
                      <span className="px-2 py-0.5 bg-banana-400/20 text-banana-300 text-[10px] font-bold rounded-full border border-banana-400/30 uppercase tracking-wider">
                        {release.label}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 font-mono">{release.date}</span>
                </div>
                <ul className="space-y-1.5">
                  {release.changes.map((change, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                      <Check className="w-3 h-3 text-green-500/70 mt-0.5 shrink-0" />
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

