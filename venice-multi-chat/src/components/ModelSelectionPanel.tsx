import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchModels, getDefaultModels } from '../services/veniceApi';
import { ModelConfig, ModelInfo } from '../types';

interface ModelSelectionPanelProps {
  selectedModels: ModelConfig[];
  setSelectedModels: React.Dispatch<React.SetStateAction<ModelConfig[]>>;
}

const ModelSelectionPanel: React.FC<ModelSelectionPanelProps> = ({ 
  selectedModels, 
  setSelectedModels 
}) => {
  const [availableModels, setAvailableModels] = useState<ModelInfo[]>([]);
  const [defaultModels, setDefaultModels] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [expandedModel, setExpandedModel] = useState<string | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      setLoading(true);
      const [models, defaults] = await Promise.all([
        fetchModels(),
        getDefaultModels()
      ]);
      setAvailableModels(models);
      setDefaultModels(defaults);
      setLoading(false);
    };

    loadModels();
  }, []);

  const handleModelToggle = (model: ModelInfo) => {
    const modelIndex = selectedModels.findIndex(m => m.id === model.id);
    
    if (modelIndex === -1) {
      // Add model with default settings
      setSelectedModels([...selectedModels, {
        id: model.id,
        name: model.id,
        temperature: 0.7,
        maxTokens: 2000,
        webSearch: false
      }]);
    } else {
      // Remove model
      setSelectedModels(selectedModels.filter(m => m.id !== model.id));
    }
  };

  const handleModelSettingChange = (modelId: string, setting: keyof ModelConfig, value: any) => {
    setSelectedModels(prev => 
      prev.map(model => 
        model.id === modelId 
          ? { ...model, [setting]: value } 
          : model
      )
    );
  };

  const handleAccordionChange = (modelId: string) => {
    setExpandedModel(expandedModel === modelId ? null : modelId);
  };

  return (
    <Paper elevation={2} sx={{ height: '100%', borderRadius: 3, overflow: 'hidden' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Typography variant="h6" component="h2" sx={{ fontSize: '1rem' }}>
          Available Models
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: '0.8rem' }}>
          Select models to compare responses
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <List sx={{ overflow: 'auto', height: 'calc(100% - 70px)' }}>
          {availableModels.map((model) => {
            const isSelected = selectedModels.some(m => m.id === model.id);
            const modelConfig = selectedModels.find(m => m.id === model.id);
            const isExpanded = expandedModel === model.id;
            
            return (
              <React.Fragment key={model.id}>
                <ListItem 
                  disablePadding 
                  sx={{ 
                    display: 'block',
                    bgcolor: isSelected ? 'rgba(63, 81, 181, 0.08)' : 'transparent'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
                    <Checkbox
                      edge="start"
                      checked={isSelected}
                      onChange={() => handleModelToggle(model)}
                      size="small"
                    />
                    <ListItemText 
                      primary={model.id} 
                      primaryTypographyProps={{ 
                        variant: 'body2',
                        sx: { fontWeight: isSelected ? 600 : 400 }
                      }}
                      secondary={
                        Object.entries(model.model_spec.capabilities)
                          .filter(([_, value]) => value === true)
                          .map(([key]) => key.replace(/^supports/, '').replace(/([A-Z])/g, ' $1').trim())
                          .join(', ')
                      }
                      secondaryTypographyProps={{ 
                        variant: 'caption',
                        sx: { fontSize: '0.7rem' }
                      }}
                    />
                  </Box>

                  {isSelected && (
                    <Accordion 
                      expanded={isExpanded}
                      onChange={() => handleAccordionChange(model.id)}
                      disableGutters
                      elevation={0}
                      sx={{ 
                        '&:before': { display: 'none' },
                        bgcolor: 'transparent'
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ 
                          minHeight: 36,
                          height: 36,
                          px: 2,
                          py: 0,
                          '& .MuiAccordionSummary-content': { my: 0 }
                        }}
                      >
                        <Typography variant="caption">Model Settings</Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ px: 2, py: 1 }}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="caption" display="block" gutterBottom>
                            Temperature: {modelConfig?.temperature.toFixed(1)}
                          </Typography>
                          <Slider
                            size="small"
                            value={modelConfig?.temperature || 0.7}
                            min={0}
                            max={1}
                            step={0.1}
                            onChange={(_, value) => 
                              handleModelSettingChange(model.id, 'temperature', value as number)
                            }
                            sx={{ py: 0 }}
                          />
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="caption" display="block" gutterBottom>
                            Max Tokens
                          </Typography>
                          <TextField
                            size="small"
                            type="number"
                            value={modelConfig?.maxTokens || 2000}
                            onChange={(e) => 
                              handleModelSettingChange(
                                model.id, 
                                'maxTokens', 
                                Math.max(1, Math.min(4000, parseInt(e.target.value) || 0))
                              )
                            }
                            inputProps={{ 
                              min: 1, 
                              max: 4000,
                              style: { fontSize: '0.8rem' }
                            }}
                            sx={{ width: '100%' }}
                          />
                        </Box>
                        
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              checked={modelConfig?.webSearch || false}
                              onChange={(e) => 
                                handleModelSettingChange(model.id, 'webSearch', e.target.checked)
                              }
                            />
                          }
                          label={
                            <Typography variant="caption">Enable Web Search</Typography>
                          }
                          sx={{ mb: 0, ml: 0 }}
                        />
                      </AccordionDetails>
                    </Accordion>
                  )}
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
      )}
    </Paper>
  );
};

export default ModelSelectionPanel; 