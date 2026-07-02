import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutClient } from "@/components/checkout/checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Confirm your GOOWALI order — cash on delivery, fresh by morning.",
};

export default function CheckoutPage() {
  return (
    <div className="bg-cream pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container-x">
        {/* useSearchParams (order vs subscription mode) requires Suspense */}
        <Suspense>
          <CheckoutClient />
        </Suspense>
      </div>
    </div>
  );
}
