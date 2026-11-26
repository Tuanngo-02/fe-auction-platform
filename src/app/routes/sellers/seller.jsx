import { useParams } from 'react-router';

import { Head } from '@/components/seo/head';
import { SellerPublicCard } from '@/features/users/components/seller-public-card';

const SellerProfileRoute = () => {
  const { sellerId } = useParams();

  return (
    <div className="mx-auto max-w-4xl">
      <Head title="Thông tin người bán" />
      <SellerPublicCard sellerId={sellerId} />
    </div>
  );
};

export default SellerProfileRoute;
