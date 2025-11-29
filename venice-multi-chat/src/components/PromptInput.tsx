import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  return (
    <Paper 
      component="form" 
      onSubmit={handleSubmit}
      elevation={2}
      sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'flex-end',
        borderRadius: 3
      }}
    >
      <TextField
        fullWidth
        multiline
        minRows={1}
        maxRows={4}
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        variant="outlined"
        sx={{ mr: 2 }}
        InputProps={{
          sx: { borderRadius: 2, fontSize: '0.9rem' }
        }}
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        endIcon={<SendIcon />}
        disabled={!prompt.trim()}
        sx={{ 
          height: 40,
          minWidth: 100
        }}
      >
        Send
      </Button>
    </Paper>
  );
};

export default PromptInput; 