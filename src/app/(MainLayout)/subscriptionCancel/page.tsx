import React from "react";
import { XCircle } from "lucide-react";
import Link from "next/link";


const SubscriptionCancelPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-destructive/10 via-background to-destructive/10 px-4">
      <div className="bg-card border border-border shadow-lg rounded-2xl p-8 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <XCircle className="w-20 h-20 text-destructive animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Payment Cancelled
        </h1>
        <p className="text-muted-foreground mb-6">
          Your payment process was cancelled. Don't worry—you can try again at
          any time.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/homePage"
            className="px-6 py-3 rounded-xl text-primary-foreground bg-foreground hover:bg-foreground/90 transition"
          >
            Back to Home
          </Link>
          <Link
            href="/pricing"
            className="px-6 py-3 rounded-xl text-destructive-foreground bg-destructive hover:bg-destructive/90 transition"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCancelPage;
