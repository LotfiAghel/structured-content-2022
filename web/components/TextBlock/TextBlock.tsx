import { PortableText, PortableTextComponents } from '@portabletext/react';
import Paragraph from '../Paragraph';
import { PortableTextBlock } from '@portabletext/types';
import { RichTextSection } from '../../types/RichTextSection';
import Link from 'next/link';

const components: Partial<PortableTextComponents> = {
  types: {
    richText: ({ value }) => (
      <>
        {value.content
          .reduce((acc, content) => [...acc, ...content.children], [])
          .map((children) => (
            <Paragraph key={children._key}>{children.text}</Paragraph>
          ))}
      </>
    ),
    person: ({ value: { name, _id } }) => {
      return (
        <Link href={`/speakers/${_id}`}>
          <a>{name}</a>
        </Link>
      );
    },
    venue: ({ value: { title, _id } }) => (
      <Link href={`/venues/${title}`}>
        <a>{title}</a>
      </Link>
    ),
  },
  block: {
    block: ({ value }) => (
      <>
        {value.children.map((children) => (
          <Paragraph key={children._key}>{children.text}</Paragraph>
        ))}
      </>
    ),
  },

  marks: {
    bold: ({ children }) => <strong>{children}</strong>,
    italic: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    code: ({ children }) => <code>{children}</code>,
    internalLink: ({ text, value }) => (
      <Link href={`/${value?.reference?._type}s/${value?.reference?._id}`}>
        {text}
      </Link>
    ),
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
