export const metadata = {
  title: "Privacy — Nyumba Edit",
  description: "Nyumba Edit privacy policy — how we collect, use and protect your information.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="font-heading text-2xl md:text-3xl font-bold">Privacy policy</h1>
      <p className="text-muted leading-relaxed">
        This draft privacy policy describes how Nyumba Edit collects, uses and
        protects information you share with us. It must be reviewed and approved
        before launch to align with the Kenya Data Protection Act, 2019.
      </p>

      <h2 className="font-heading text-xl font-bold mt-6">1. Information we collect</h2>
      <p className="text-muted leading-relaxed">
        We collect only the information you voluntarily provide — for example
        your name, phone number and email when you submit a retailer listing
        request, contact us or send an enquiry to a retailer. We do not collect
        payment information; Nyumba Edit does not process transactions.
      </p>

      <h2 className="font-heading text-xl font-bold mt-6">2. How we use your information</h2>
      <p className="text-muted leading-relaxed">
        We use your information to respond to your requests, route retailer
        enquiries, and (where you consent) share new guides and retailer
        features. We do not sell your personal information to third parties.
      </p>

      <h2 className="font-heading text-xl font-bold mt-6">3. Retailer enquiries</h2>
      <p className="text-muted leading-relaxed">
        When you contact a retailer through Nyumba Edit, your message and
        contact details are shared with that retailer so they can respond. We do
        not control how retailers use your information after that point.
      </p>

      <h2 className="font-heading text-xl font-bold mt-6">4. Your rights</h2>
      <p className="text-muted leading-relaxed">
        Under the Kenya Data Protection Act, 2019, you may have the right to
        access, correct or delete your personal data, and to withdraw consent.
        Contact us to exercise these rights.
      </p>

      <h2 className="font-heading text-xl font-bold mt-6">5. Cookies</h2>
      <p className="text-muted leading-relaxed">
        We may use cookies or similar technologies to remember preferences and
        understand how the site is used. You can disable cookies in your browser
        settings.
      </p>

      <p className="mt-8 text-xs text-muted">
        Draft copy — requires legal review before production. This page does not
        constitute legal advice.
      </p>
    </div>
  );
}
