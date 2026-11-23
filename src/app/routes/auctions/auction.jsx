import { useParams } from 'react-router';

import { AuctionView } from '@/features/auctions/components/auction-view';

const AuctionRoute = () => {
  const { auctionId } = useParams();
  return <AuctionView auctionId={auctionId} />;
};

export default AuctionRoute;
