import { Section } from './Section';
import { Person } from './Person';

export type Session = {
  _id: string;
  _type: 'session';
  title?: string;
  duration?: number;
  shortDescription?: Section;
  longDescription?: Section;
  speakers?: {
    role: 'speaker' | 'moderator';
    person: Person;
  }[];
  type?: 'talk' | 'panel' | 'break' | 'social' | 'workshop';
};
