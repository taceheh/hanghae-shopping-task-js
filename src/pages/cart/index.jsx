import { CartTable } from '@/pages/cart/components/CartTable';
import { EmptyNotice } from '@/pages/cart/components/EmptyNotice';
import { Layout, authStatusType } from '@/pages/common/components/Layout';
import React from 'react';
import { useCartStore } from '../../zustand/cartStore';

export const Cart = () => {
  // Zustand에서 cart 데이터 가져오기
  const { cart } = useCartStore((state) => ({
    cart: state.cart,
  }));
  const isExist = cart.length > 0;

  return (
    <Layout
      className="p-2.5 flex flex-col"
      authStatus={authStatusType.NEED_LOGIN}
    >
      {isExist ? <CartTable /> : <EmptyNotice />}
    </Layout>
  );
};
