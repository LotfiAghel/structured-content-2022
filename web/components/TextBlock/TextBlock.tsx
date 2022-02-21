import Link from 'next/link';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import { RichTextSection } from '../../types/RichTextSection';
import { getEntityPath } from '../../util/entityPaths';
import { SharedSections } from './SharedSections';
import { Person } from './Person';
import { RichText } from './RichText';
import { Block } from './Block';
import { Venue } from './Venue';
import { QuestionAndAnswerCollection } from './QuestionAndAnswerCollection';
import { TextAndImage } from './TextAndImage';
import Paragraph from '../Paragraph';

const components: Partial<PortableTextComponents> = {
  types: {
    richText: RichText,
    person: Person,
    venue: Venue,
    questionAndAnswerCollection: QuestionAndAnswerCollection,
    block: Block,
    textAndImage: TextAndImage,
    sharedSections: SharedSections,
  },
  marks: {
    bold: ({ children }) => <strong>{children}</strong>,
    italic: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    code: ({ children }) => <code>{children}</code>,
    internalLink: ({ text, value }) => (
      <Link href={getEntityPath(value.reference)}>{text}</Link>
    ),
  },
  block: {
    normal: ({ children }) => <Paragraph>{children}</Paragraph>,
  },
};

interface TextBlockProps {
  value?:
    | PortableTextBlock[]
    | PortableTextBlock
    | RichTextSection
    | RichTextSection[];
}

export const TextBlock = ({ value }: TextBlockProps) =>
  value ? <PortableText value={value} components={components} /> : <></>;
