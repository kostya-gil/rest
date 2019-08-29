import { Request } from 'express';

export interface BodySection {
  name: string;
}

export const bodySectionKeys = [
  'name',
]

export interface SectionRequest extends Request {
  body: BodySection;
}
