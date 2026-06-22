import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="bg-morning flex min-h-[70vh] items-center">
      <div className="container-x text-center">
        <p className="text-eyebrow text-green">Lost the trail</p>
        <h1 className="text-display mt-6">This page has gone dry.</h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-stone">
          The page you&rsquo;re looking for isn&rsquo;t here — but the milk
          still is.
        </p>
        <div className="mt-9 flex justify-center gap-4">
          <Button href="/" size="lg">
            Back home
          </Button>
          <Button href="/products" variant="outline" size="lg">
            Browse products
          </Button>
        </div>
      </div>
    </section>
  );
}
