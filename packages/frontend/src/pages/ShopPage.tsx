import ShopSidebar from '../components/ShopSidebar';
import ProductGreed from '../components/ProductGrid.tsx';
import cl from './ShopPage.module.css';
import { useAppContext } from '../context/Context.tsx';

function ShopPage() {
  const { products } = useAppContext();
  return (
    <div className={cl.ShopPage}>
      <ShopSidebar />
      <ProductGreed key={products[0]?.shopId || 'empty'} />
    </div>
  );
}

export default ShopPage;
