export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
  estimatedTime: string;
  dueDate?: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  aiAssistance: {
    available: boolean;
    type: 'analysis' | 'generation' | 'optimization' | 'recommendation';
    description: string;
  };
  subtasks?: SubTask[];
  detailedGuide: {
    purpose: string;
    steps: string[];
    tips: string[];
    expectedResult: string;
    aiHelp?: string;
  };
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  aiGenerated?: boolean;
  guide: {
    description: string;
    method: string;
    tip: string;
  };
}

export interface ScheduleItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'content' | 'upload' | 'analysis' | 'meeting';
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  linkedTaskId?: string;
}

export interface AIAssistantData {
  taskId: string;
  analysis?: any;
  recommendations?: string[];
  generatedContent?: any;
}

export interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: any;
  completed: boolean;
  tasks: Task[];
}