import axiosInstance from '@/lib/axios';


export interface ChatMessage {
  id?: number;
  role: 'USER' | 'AI';
  content: string;
}

const endpoints = {
  createSession: '/api/chat/sessions',
  sendMessage: '/api/chat/send',
};


const callProxy = async <T>(targetUrl: string, method: 'POST', data: any): Promise<T> => {
  const response = await axiosInstance.post('/api/post', {
    url: targetUrl,
    method: method,
    body: data
  });
  return response.data.data;
};

export const chatService = {
  
  createNewSession: async (userId: number, title: string) => {
    return await callProxy<any>(endpoints.createSession, 'POST', { userId, title });
  },

  
  sendUserMessage: async (sessionId: number, message: string) => {
    return await callProxy<ChatMessage>(endpoints.sendMessage, 'POST', { sessionId, content: message });
  }
};