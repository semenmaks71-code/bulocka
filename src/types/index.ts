export type SceneType =
  | 'intro'
  | 'secret-code'
  | 'envelope'
  | 'quiz'
  | 'memory'
  | 'timeline'
  | 'voice'
  | 'song'
  | 'secret-room'
  | 'finale';

export interface Riddle {
  id: number;
  question: string;
  hint?: string;
  acceptedAnswers: string[];
  successMessage: string;
}

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  description: string;
}
