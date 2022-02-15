import { Session } from '../types/Session';
import { Venue } from '../types/Venue';
import { Person } from '../types/Person';
import { Sponsor } from '../types/Sponsor';

type Entity = Person | Session | Venue | Sponsor;

export const getEntityPath = (entity: Entity) => {
  if (!entity.slug?.current) {
    return '#';
  }

  switch (entity._type) {
    case 'session':
      return `/sessions/${entity.slug?.current}`;
    case 'person':
      return `/speakers/${entity.slug?.current}`;
    case 'venue':
      return `/venues/${entity.slug?.current}`;
    case 'sponsor':
      return `/sponsors/${entity.slug?.current}`;
    default:
      return '';
  }
};
