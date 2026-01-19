
export enum HabilitationStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED'
}

export interface User {
  id: string;
  name: string;
  role: 'ADMIN' | 'EVALUATOR' | 'CANDIDATE';
  email: string;
}

export interface Habilitation {
  id: string;
  title: string;
  candidateName: string;
  issueDate: string;
  expiryDate: string;
  status: HabilitationStatus;
  score: number;
}

export interface Evaluation {
  id: string;
  candidateId: string;
  evaluatorId: string;
  technicalSkills: number;
  safetyCompliance: number;
  theoreticalKnowledge: number;
  comments: string;
  timestamp: string;
}

export interface SystemMetrics {
  serverStatus: 'UP' | 'DOWN' | 'MAINTENANCE';
  cpuUsage: number;
  memoryUsage: number;
  databaseLatency: number;
  activeSessions: number;
}
