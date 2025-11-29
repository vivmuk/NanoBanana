import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PromptInput from './components/PromptInput';
import ModelSelectionPanel from './components/ModelSelectionPanel';
import ResponseGrid from './components/ResponseGrid';
import { ModelConfig } from './types';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontSize: 13,
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [selectedModels, setSelectedModels] = useState<ModelConfig[]>([]);

  const handlePromptSubmit = async (inputPrompt: string) => {
    if (!inputPrompt.trim() || selectedModels.length === 0) return;
    
    setPrompt(inputPrompt);
    
    // Set loading state for all selected models
    const newLoadingState: Record<string, boolean> = {};
    selectedModels.forEach(model => {
      newLoadingState[model.id] = true;
    });
    setLoading(newLoadingState);
    
    // Clear previous responses
    setResponses({});
    
    // Send requests to all selected models simultaneously
    const promises = selectedModels.map(model => 
      fetchModelResponse(inputPrompt, model)
    );
    
    // Wait for all promises to resolve
    await Promise.allSettled(promises);
  };

  const fetchModelResponse = async (inputPrompt: string, model: ModelConfig) => {
    try {
      const response = await fetch('https://api.venice.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer qSXSNUAsIEo-CKXzRwgAka80w7RjW6QkiU2RlBdn_Z'
        },
        body: JSON.stringify({
          model: model.id,
          messages: [
            { role: 'user', content: inputPrompt }
          ],
          venice_parameters: {
            enable_web_search: model.webSearch ? 'on' : 'off'
          },
          max_tokens: model.maxTokens,
          temperature: model.temperature,
          stream: false
        })
      });

      const data = await response.json();
      
      // Update responses state
      setResponses(prev => ({
        ...prev,
        [model.id]: data.choices[0]?.message?.content || 'No response received'
      }));
    } catch (error) {
      console.error(`Error fetching response from ${model.id}:`, error);
      setResponses(prev => ({
        ...prev,
        [model.id]: `Error: Failed to get response from ${model.id}`
      }));
    } finally {
      // Update loading state
      setLoading(prev => ({
        ...prev,
        [model.id]: false
      }));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false} sx={{ height: '100vh', py: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Venice AI Multi-Chat
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', height: 'calc(100% - 80px)' }}>
          <Box sx={{ width: 300, mr: 2 }}>
            <ModelSelectionPanel 
              selectedModels={selectedModels} 
              setSelectedModels={setSelectedModels} 
            />
          </Box>
          
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <PromptInput onSubmit={handlePromptSubmit} />
            
            <Box sx={{ flex: 1, mt: 2, overflow: 'auto' }}>
              <ResponseGrid 
                responses={responses} 
                loading={loading} 
                models={selectedModels} 
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 