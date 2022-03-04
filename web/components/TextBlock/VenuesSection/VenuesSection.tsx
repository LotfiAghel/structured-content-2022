import { PortableTextComponentProps } from '@portabletext/react';
import { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import { Venue } from '../../../types/Venue';
import GridWrapper from '../../GridWrapper';
import VenueNames from '../../VenueNames';
import { getCollectionForSelectionType } from '../../../util/entity';

type VenuesSectionProps = {
  type: EntitySectionSelection;
  allVenues: Venue[];
  venues?: Venue[];
};

export const VenuesSection = ({
  value: { type, allVenues, venues },
}: PortableTextComponentProps<VenuesSectionProps>) => {
  if (!Array.isArray(allVenues) || allVenues.length === 0) {
    console.error(
      `VenuesSection missing or invalid venues array: '${allVenues}'`
    );
    return null;
  }

  const sectionVenues = getCollectionForSelectionType(type, allVenues, venues);
  return sectionVenues.length === 0 ? null : (
    <GridWrapper>
      <VenueNames venues={sectionVenues} />
    </GridWrapper>
  );
};
