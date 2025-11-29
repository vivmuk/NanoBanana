import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import ReactMarkdown from 'react-markdown';
import { ModelConfig } from '../types';

interface ResponseGridProps {
  responses: Record<string, string>;
  loading: Record<string, boolean>;
  models: ModelConfig[];
}

const ResponseGrid: React.FC<ResponseGridProps> = ({ responses, loading, models }) => {
  if (models.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 3
      }}>
        <Typography variant="body2" color="text.secondary">
          Select models from the panel to see responses
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {models.map((model) => (
        <Grid item xs={12} md={6} lg={4} key={model.id}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 2, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: 3,
              overflow: 'hidden'
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 1,
              pb: 1,
              borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                {model.id}
              </Typography>
              <Box>
                <Chip 
                  label={`Temp: ${model.temperature.toFixed(1)}`} 
                  size="small" 
                  sx={{ 
                    mr: 0.5, 
                    height: 20, 
                    fontSize: '0.7rem',
                    bgcolor: 'rgba(0, 0, 0, 0.05)'
                  }} 
                />
                {model.webSearch && (
                  <Chip 
                    label="Web" 
                    size="small" 
                    color="primary" 
                    sx={{ 
                      height: 20, 
                      fontSize: '0.7rem',
                      bgcolor: 'rgba(63, 81, 181, 0.1)',
                      color: 'primary.main'
                    }} 
                  />
                )}
              </Box>
            </Box>
            
            <Box sx={{ 
              flex: 1, 
              overflow: 'auto', 
              fontSize: '0.85rem',
              bgcolor: 'rgba(0, 0, 0, 0.02)',
              borderRadius: 2,
              p: 1.5
            }}>
              {loading[model.id] ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                  <CircularProgress size={24} />
                </Box>
              ) : responses[model.id] ? (
                <Box sx={{ 
                  '& p': { 
                    mt: 0, 
                    mb: 1.5,
                    fontSize: '0.85rem',
                    lineHeight: 1.5
                  },
                  '& pre': {
                    p: 1,
                    borderRadius: 1,
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                    fontSize: '0.8rem',
                    overflow: 'auto'
                  },
                  '& code': {
                    fontSize: '0.8rem',
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                    p: 0.3,
                    borderRadius: 0.5
                  },
                  '& ul, & ol': {
                    pl: 2.5,
                    mb: 1.5
                  },
                  '& li': {
                    mb: 0.5
                  },
                  '& h1, & h2, & h3, & h4, & h5, & h6': {
                    fontSize: '1rem',
                    fontWeight: 600,
                    mt: 1.5,
                    mb: 1
                  }
                }}>
                  <ReactMarkdown>
                    {responses[model.id]}
                  </ReactMarkdown>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
                  No response yet
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ResponseGrid; 