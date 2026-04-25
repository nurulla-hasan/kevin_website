import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Your Trade Source',
  description: 'Read our Terms of Service to understand the rules and regulations for using our platform.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-muted py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-lg shadow-md p-8 sm:p-12">
        <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
          Terms of Service
        </h1>
        
        <div className="prose prose-blue max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: April 16, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using Your Trade Source (&quot;the Platform&quot;), you agree to be bound by these 
              Terms of Service. If you disagree with any part of these terms, you may not access the Platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              2. Description of Service
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Your Trade Source is a platform that connects homeowners with professional contractors 
              for interior, exterior, lawn & garden, and specialized services. We provide a marketplace 
              for users to find, book, and manage home improvement services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              3. User Accounts
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you create an account with us, you must provide accurate, complete, and current 
              information. You are responsible for safeguarding your account password and for any 
              activities or actions under your account.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You agree not to share your account credentials with third parties and to notify us 
              immediately of any unauthorized use of your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              4. User Responsibilities
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              As a user of the Platform, you agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide accurate and truthful information about your service needs</li>
              <li>Communicate respectfully with contractors and other users</li>
              <li>Honor scheduled appointments and payments for services rendered</li>
              <li>Not use the Platform for any illegal or unauthorized purpose</li>
              <li>Not attempt to circumvent our payment or booking systems</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              5. Contractor Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Contractors using the Platform must maintain appropriate licenses, insurance, and 
              qualifications for the services they offer. Contractors agree to provide services 
              in a professional manner, honor quoted prices, and comply with all applicable laws 
              and regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              6. Payments and Fees
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Users agree to pay all fees associated with services booked through the Platform. 
              Payment terms are between the user and the contractor. Your Trade Source may charge 
              service fees or subscription fees as disclosed at the time of transaction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Your Trade Source is not responsible for the quality of work performed by contractors. 
              We act solely as a marketplace platform and do not guarantee the performance of any 
              contractor. Users must conduct their own due diligence when hiring contractors.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              8. Termination
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may terminate or suspend your account immediately, without prior notice or liability, 
              for any reason, including breach of these Terms. Upon termination, your right to use 
              the Platform will immediately cease.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              9. Changes to Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. If a revision is 
              material, we will try to provide at least 30 days&apos; notice prior to taking effect. 
              What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              10. Contact Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="mt-4 text-muted-foreground">
              <p>Your Trade Source</p>
              <p>6600 Headquarters Oaks Blvd Ste. 150</p>
              <p>Plano, TX. 75023</p>
              <p>Email: info@sparktech.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
