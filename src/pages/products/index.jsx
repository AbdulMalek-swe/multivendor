import React from 'react';
import useProduct from '@/hooks/api/Product/useProduct';
import SingleCart from '@/components/card/SingleCart';
import PageLayout from '@/components/ui/PageLayout';

const Product = () => {
     const { data: productList } = useProduct();
    return (
        <PageLayout>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {productList?.map((product, idx) => (
                <SingleCart product={product} key={idx} />
              ))}
            </div>
        </PageLayout>
    );
};

export default Product;