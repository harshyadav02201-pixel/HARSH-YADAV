export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  imageUrl?: string;
  author: string;
  createdAt: Date;
}

export interface QuoteRequest {
  id?: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  insuranceType: 'term' | 'endowment' | 'ulip' | 'retirement' | 'child';
  coverageAmount: number;
  createdAt: Date;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  content: string;
  createdAt: Date;
}
