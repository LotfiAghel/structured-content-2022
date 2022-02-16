import Link from 'next/link';
import client from '../../lib/sanity.server';
import { Venue } from '../../types/Venue';
import SectionBlock from '../../components/SectionBlock';
import Heading from '../../components/Heading';
import Paragraph from '../../components/Paragraph';
import PageContainer from '../../components/PageContainer';
import Nav from '../../components/Nav';
import styles from '../../pageResources/about/venue/venue.module.css';

const QUERY = `
  *[_type == "venue"][slug.current == $slug][0] {
    _id,
    title,
    geolocation
  }`;

interface VenueProps {
  data: Venue;
}

const mapUrl = (geolocation: { lat: number; lng: number }) =>
  `https://maps.google.com/maps?q=${geolocation.lat},${geolocation.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

const Venue = ({ data: { title, geolocation } }: VenueProps) => (
  <>
    <header>
      <Nav />
    </header>
    <PageContainer>
      <main>
        <SectionBlock>
          <Heading>{title}</Heading>
        </SectionBlock>

        <SectionBlock>
          <div className={styles.location}>
            <div>
              <Heading type="h2">Location</Heading>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. This text is not
                fetched from Sanity.
              </Paragraph>
            </div>
            <div className={styles.map}>
              {geolocation?.lat && geolocation?.lng && (
                <iframe src={mapUrl(geolocation)} />
              )}
            </div>
          </div>
        </SectionBlock>

        <SectionBlock>
          <Heading type="h2">Attendee details</Heading>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. This text is not fetched from
            Sanity.
          </Paragraph>
        </SectionBlock>

        <SectionBlock>
          <Heading type="h2">Associated company/contact</Heading>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. This text is not fetched from
            Sanity.
          </Paragraph>
        </SectionBlock>

        <SectionBlock noBackground>
          <Paragraph>
            <Link href="#">{'See program for this venue ->'}</Link>
          </Paragraph>
        </SectionBlock>
      </main>
    </PageContainer>
  </>
);

export async function getServerSideProps({ params: { slug } }) {
  const data = await client.fetch(QUERY, { slug: slug || '' });
  if (!data?._id) {
    return { notFound: true };
  }

  return { props: { data } };
}

export default Venue;
