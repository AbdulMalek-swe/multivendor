import React from 'react';
import useProduct from '@/hooks/api/Product/useProduct';
import SingleCart from '@/components/card/SingleCart';

const Product = () => {
     const { data: productList } = useProduct();
    return (
        <div>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {productList?.map((product, idx) => (
                <SingleCart product={product} key={idx} />
              ))}
            </div>
        </div>
    );
};

export default Product;