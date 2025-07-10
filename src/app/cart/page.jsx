import { getNavigation, getCheckoutOptions } from '@/lib/api';
import CartClient from "@/components/CartClient";

export const dynamic = 'force-dynamic';

export default async function CartPage() {
    const [navigationData, checkoutOptions] = await Promise.all([
        getNavigation(),
        getCheckoutOptions()
    ]);

    return <CartClient navigation={navigationData} checkoutOptions={checkoutOptions} />;
}