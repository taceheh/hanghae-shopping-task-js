import { create } from 'zustand';
import { fetchProducts, addProductAPI } from '@/api/product';

export const useProductsStore = create((set) => ({
  // 상태 정의
  items: [],
  hasNextPage: true,
  isLoading: false,
  error: null,
  totalCount: 0,

  // Actions(상태 변경 함수)
  loadProducts: async ({ filter, pageSize, page, isInitial }) => {
    set({ isLoading: true, error: null }); // 로딩 상태 시작
    try {
      const result = await fetchProducts(filter, pageSize, page);
      set((state) => ({
        items: isInitial
          ? result.products
          : [...state.items, ...result.products],
        hasNextPage: result.hasNextPage,
        totalCount: result.totalCount,
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || 'Failed to load products',
      });
    }
  },

  addProduct: async (productData) => {
    set({ isLoading: true, error: null }); // 로딩 상태 시작
    try {
      const newProduct = await addProductAPI(productData);
      set((state) => ({
        items: [newProduct, ...state.items],
        totalCount: state.totalCount + 1,
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || 'Failed to add product',
      });
    }
  },
}));
