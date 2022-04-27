import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import urlJoin from 'proper-url-join';
import type { Venue } from '../../types/Venue';
import styles from './VenueNav.module.css';

interface VenueNavProps {
  venues: Venue[];
  activeVenue?: Venue;
  ariaControlsId: string;
}

const venueLabel = (venueName: string) =>
  ({
    'San Francisco': 'Main venue',
    Virtual: 'Online',
  }[venueName] || 'Satellite');

export const VenueNav = ({
  venues,
  activeVenue,
  ariaControlsId,
}: VenueNavProps) => {
  const router = useRouter();
  return (
    <nav className={styles.container}>
      <ul className={styles.venues}>
        {venues.map(({ name, _id }) => (
          <li
            key={name}
            className={clsx(
              styles.venuesItem,
              activeVenue?._id === _id && styles.active
            )}
          >
            <Link href={urlJoin(router.asPath, { query: { venue: name } })}>
              <a
                className={clsx(
                  styles.venue,
                  activeVenue?._id === _id && styles.active
                )}
                aria-controls={ariaControlsId}
              >
                <span className={styles.venueName}>{name}</span>
                <span className={styles.venueSubtitle}>{venueLabel(name)}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
