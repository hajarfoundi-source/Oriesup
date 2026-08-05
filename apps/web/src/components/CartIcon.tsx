import { useParams, Link } from 'react-router-dom';
import { useCart } from '../features/student/cart/CartContext';

export function CartIcon() {
  const { schoolSlug } = useParams<{ schoolSlug: string }>();
  const { serviceIds } = useCart();

  return (
    <Link to={`/s/${schoolSlug}/student/cart`} className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 text-neutral-700">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.98-4.706 2.545-7.174.108-.48-.26-.926-.75-.926H5.106M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
      {serviceIds.length > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brandCta text-[10px] font-bold text-white">
          {serviceIds.length}
        </span>
      )}
    </Link>
  );
}
