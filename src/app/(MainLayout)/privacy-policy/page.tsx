import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Your Trade Source',
  description: 'Read our Privacy Policy to understand how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 sm:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Privacy Policy
        </h1>
        
        <div className="prose prose-blue max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: April 16, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Your Trade Source (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website or use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may collect information about you in a variety of ways, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                <strong>Personal Data:</strong> Name, email address, phone number, and address when you 
                register or request services.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our website and services.
              </li>
              <li>
                <strong>Location Data:</strong> Your location information when you use location-based services.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may use the information we collect for various purposes, including to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Provide, operate, and maintain our services</li>
              <li>Improve, personalize, and expand our services</li>
              <li>Communicate with you about updates, promotions, and support</li>
              <li>Process your transactions and manage your account</li>
              <li>Protect against fraudulent or illegal activity</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Information Sharing
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information with service providers who assist us in operating 
              our website and conducting our business, subject to confidentiality agreements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect 
              your personal information. However, no method of transmission over the internet is 
              completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Your Rights
            </h2>
            <p className="text-gray-600 leading-relaxed">
              You have the right to access, correct, or delete your personal information. 
              You may also opt out of receiving promotional communications from us. 
              To exercise these rights, please contact us at info@sparktech.com.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              7. Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 text-gray-600">
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
