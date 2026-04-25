import { redirect } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-md p-8 max-w-md w-full">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-foreground text-center mb-2">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground text-center mb-6">
          Thank you for your purchase. Your order has been confirmed. 
        </p>

        {/* Next Steps */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            A confirmation email has been sent to your email address.
          </p>

          <div className="space-y-3">
            <Link
              href="/"
              className="w-full bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
