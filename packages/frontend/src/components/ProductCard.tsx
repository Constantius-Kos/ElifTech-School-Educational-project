import cl from './ProductGrid.module.css';
import imageMap from '../assets/images/index.js';
import { useAppContext } from '../context/Context.tsx';
import type { IProduct } from '@shared/sharedTypes.js';

function ProductCard({ product }: { product: IProduct }) {
  const { dispatch } = useAppContext();
  return (
    <div key={product._id} className={cl.Product}>
      <img src={imageMap[product.img]} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price} UAH</p>
      <button
        onClick={() =>
          dispatch({
            type: 'ADD_ITEM_TO_CART',
            payload: {
              img: product.img,
              productId: product._id,
              name: product.name,
              price: product.price,
              quantity: 1,
            },
          })
        }
      >
        Add to cart
      </button>
    </div>
  );
}

export default ProductCard;
