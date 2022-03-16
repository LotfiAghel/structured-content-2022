import { useRef, useMemo, CSSProperties } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './NavBlock.module.css';

import useIntersection from '../../hooks/useIntersection';
import { getRandomAnimation } from '../../lib/animation';

const RANDOM_SHAPE_PERCENT_CHANCE = 0.33;
type Shape = 'Plus' | 'C' | 'Ovals' | 'O' | 'HalfOval';

interface FakeItemProps {
  divider?: boolean;
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
}

const getRandomShape = (): Shape => {
  const shapes: Shape[] = ['Plus', 'C', 'Ovals', 'O', 'HalfOval'];
  return shapes[Math.floor(Math.random() * shapes.length)];
};

const FakeItem = ({ divider, mobile, tablet, desktop }: FakeItemProps) => {
  const shapeClass: string | null = useMemo(() => {
    if (Math.random() <= RANDOM_SHAPE_PERCENT_CHANCE) {
      return styles[`shape${getRandomShape()}`];
    }

    return null;
  }, []);
  const animation = useMemo(getRandomAnimation, []) as CSSProperties;

  return (
    <li
      style={animation}
      className={clsx(
        divider ? styles.divider : styles.fakeItem,
        mobile && styles.mobile,
        tablet && styles.tablet,
        desktop && styles.desktop,
        shapeClass
      )}
      aria-hidden="true"
    />
  );
};

interface NavBlockProps {
  ticketsUrl: string;
}

export const NavBlock = ({ ticketsUrl }: NavBlockProps) => {
  const wrapperRef = useRef<HTMLElement>();
  const isIntersecting = useIntersection(wrapperRef);

  const animation1 = useMemo(getRandomAnimation, []) as CSSProperties;
  const animation2 = useMemo(getRandomAnimation, []) as CSSProperties;
  const animation3 = useMemo(getRandomAnimation, []) as CSSProperties;
  const animation4 = useMemo(getRandomAnimation, []) as CSSProperties;
  const animation5 = useMemo(getRandomAnimation, []) as CSSProperties;

  return (
    <nav
      className={clsx(styles.nav, isIntersecting && styles.navEnter)}
      ref={wrapperRef}
    >
      <ul className={styles.list}>
        <li className={styles.item} style={animation1}>
          <Link href="/program">
            <a className={styles.link}>Program</a>
          </Link>
        </li>

        <FakeItem mobile tablet desktop />
        <FakeItem mobile tablet desktop />
        <FakeItem divider mobile />
        <FakeItem mobile />

        <li className={styles.item} style={animation2}>
          <Link href="/sponsorship-information">
            <a className={styles.link}>Sponsorship</a>
          </Link>
        </li>

        <FakeItem tablet desktop />
        <FakeItem divider mobile tablet desktop />
        <FakeItem tablet desktop />
        <FakeItem tablet desktop />
        <FakeItem tablet desktop />
        <FakeItem mobile tablet desktop />

        <li className={styles.item} style={animation3}>
          <Link href="/registration-info">
            <a className={styles.link}>Registration</a>
          </Link>
        </li>

        <FakeItem divider mobile tablet desktop />

        <li className={styles.item} style={animation4}>
          <Link href="/about">
            <a className={styles.link}>About</a>
          </Link>
        </li>

        <FakeItem mobile tablet desktop />
        <FakeItem mobile desktop />
        <FakeItem divider mobile />

        <li className={styles.item} style={animation5}>
          <Link href={ticketsUrl}>
            <a className={styles.link}>Tickets</a>
          </Link>
        </li>

        <FakeItem tablet desktop />
        <FakeItem mobile desktop />
      </ul>
    </nav>
  );
};
