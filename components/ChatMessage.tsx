import React, { useState } from 'react';
import { Message } from '../types';
import { User, Bot, Sparkles, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyPrompt = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>

        {/* Avatar */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border ${isUser
          ? 'bg-obsidian-800 border-obsidian-800'
          : 'bg-banana-400 border-banana-500 shadow-[0_0_15px_rgba(255,225,53,0.3)]'
          }`}>
          {isUser ? (
            <User className="w-5 h-5 text-gray-400" />
          ) : (
            <Bot className="w-6 h-6 text-obsidian-950" />
          )}
        </div>

        {/* Bubble */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`relative px-6 py-4 rounded-2xl text-sm md:text-base leading-relaxed overflow-hidden ${isUser
            ? 'bg-obsidian-800 text-gray-100 border border-gray-800 rounded-tr-none'
            : 'bg-gradient-to-br from-obsidian-900 to-obsidian-950 border border-gray-800/50 text-gray-200 rounded-tl-none shadow-xl'
            }`}>
            {/* Decorative glow for bot */}
            {!isUser && (
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-banana-400 to-transparent opacity-20" />
            )}

            {message.isThinking ? (
              <div className="flex items-center gap-2 text-banana-400 animate-pulse">
                <Sparkles className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-widest">Architect is thinking...</span>
              </div>
            ) : (
              <div className="prose prose-invert prose-p:my-2 prose-pre:bg-black/50 prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-lg max-w-none">
                <ReactMarkdown
                  components={{
                    code({ node, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '')
                      const codeText = String(children).replace(/\n$/, '');
                      // Use a hash of the code content as ID for consistent state
                      const codeId = `code-${message.id}-${codeText.slice(0, 20).replace(/\s/g, '')}`;
                      const isCopied = copiedId === codeId;

                      return match ? (
                        <div className="relative group my-4">
                          <div className="flex items-center justify-between absolute -top-3 left-2 right-2 z-10">
                            <div className="px-2 bg-banana-400 text-obsidian-950 text-[10px] font-bold uppercase rounded tracking-wider">
                              Prompt Code
                            </div>
                            <button
                              onClick={() => handleCopyPrompt(codeText, codeId)}
                              className="flex items-center gap-1 px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-banana-400 text-[10px] font-medium rounded transition-colors border border-gray-700"
                              title="Copy prompt"
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <code className={`${className} block bg-[#0a0a0a] p-4 pt-6 rounded-lg border border-yellow-500/20 text-yellow-50 font-mono text-sm shadow-inner break-words whitespace-pre-wrap`} {...props}>
                            {children}
                          </code>
                        </div>
                      ) : (
                        <code className="bg-gray-800 px-1 py-0.5 rounded text-banana-300 font-mono text-xs" {...props}>
                          {children}
                        </code>
                      )
                    },
                    img({ node, className, ...props }) {
                      return (
                        <img
                          {...props}
                          className={`max-w-full rounded-xl shadow-lg border border-gray-800 ${className || ''}`}
                          loading="lazy"
                          onError={(e) => {
                            console.error("Image Load Error:", e);
                            console.error("Image Source:", props.src);
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.insertAdjacentHTML('afterend', '<p class="text-red-400 text-xs italic p-2 border border-red-900/50 bg-red-900/10 rounded">Error loading image. Please check console.</p>');
                          }}
                        />
                      );
                    }
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
          <span className="mt-2 text-xs text-gray-600 font-mono">
            {isUser ? 'You' : 'Nano Banana Architect'}
          </span>
        </div>

      </div>
    </div>
  );
};
