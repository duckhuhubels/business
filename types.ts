
export enum DogPersona {
  GOLDEN_RETRIEVER = 'Golden Retriever',
  BORDER_COLLIE = 'Border Collie',
  GERMAN_SHEPHERD = 'German Shepherd',
  LABRADOR = 'Labrador'
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  category: 'business' | 'creative' | 'personal';
  createdAt: Date;
}

export interface DogHelper {
  id: DogPersona;
  name: string;
  description: string;
  specialty: string;
  imageUrl: string;
  systemPrompt: string;
}
