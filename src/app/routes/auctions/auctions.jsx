import { Head } from '@/components/seo/head';
import { AuctionsList } from '@/features/auctions/components/auctions-list';

const AuctionsRoute = () => {
  return (
    <>
      <Head title="Phiên đấu giá" />
      <h1 className="mb-6 text-2xl font-bold">Phiên đấu giá</h1>
      <AuctionsList />
    </>
  );
};

export default AuctionsRoute;
