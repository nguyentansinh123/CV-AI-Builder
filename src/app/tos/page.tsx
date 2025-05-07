"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: "definitions",
      title: "1. Definitions",
      content: (
        <>
          <p>
            Throughout these Terms of Service ("Terms"), the following
            definitions apply:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              "<strong>CV Builder Pro</strong>", "<strong>we</strong>", "
              <strong>our</strong>", or "<strong>us</strong>" refers to CV
              Builder Pro and its parent company, subsidiaries, and affiliates.
            </li>
            <li>
              "<strong>Service</strong>" means the CV Builder Pro website,
              applications, tools, and related services.
            </li>
            <li>
              "<strong>User</strong>", "<strong>you</strong>", or "
              <strong>your</strong>" refers to any individual or entity using
              our Service.
            </li>
            <li>
              "<strong>User Content</strong>" means any content you upload,
              create, or share through our Service, including resume data,
              profile information, and customizations.
            </li>
            <li>
              "<strong>Subscription</strong>" refers to the paid access plans
              that provide enhanced features beyond the free tier.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "service-description",
      title: "2. Service Description",
      content: (
        <>
          <p>
            CV Builder Pro is a professional resume and curriculum vitae
            creation platform that offers tools to create, customize, and manage
            career documents. Our Service includes:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Resume building and editing tools</li>
            <li>Templates and design options</li>
            <li>Career document storage and management</li>
            <li>Optional premium features through paid subscriptions</li>
          </ul>
        </>
      ),
    },
    {
      id: "account-registration",
      title: "3. Account Registration",
      content: (
        <>
          <p>
            3.1. To access certain features of our Service, you must create an
            account. You agree to provide accurate, current, and complete
            information during registration and to update such information to
            keep it accurate and current.
          </p>
          <p className="mt-2">
            3.2. You are solely responsible for maintaining the confidentiality
            of your account credentials and for all activities that occur under
            your account. You must immediately notify us of any unauthorized use
            of your account or any other breach of security.
          </p>
          <p className="mt-2">
            3.3. We reserve the right to disable any account if we believe you
            have violated these Terms or if we determine, in our sole
            discretion, that your account activity threatens the integrity of
            our Service.
          </p>
        </>
      ),
    },
    {
      id: "service-tiers",
      title: "4. Service Tiers and Subscriptions",
      content: (
        <>
          <p>
            4.1. <strong>Free Tier:</strong> We offer limited access to basic
            features at no cost. The free tier allows users to create up to
            three (3) resumes with standard templates and essential editing
            functionality.
          </p>
          <p className="mt-2">
            4.2. <strong>Premium Tier:</strong> Our premium subscription offers
            enhanced features including access to advanced AI tools, priority
            support, and up to three (3) resumes.
          </p>
          <p className="mt-2">
            4.3. <strong>Premium Plus Tier:</strong> This tier includes all
            premium features plus unlimited resumes and exclusive design
            customizations.
          </p>
          <p className="mt-2">
            4.4. <strong>Subscription Terms:</strong> Subscriptions are billed
            on a recurring basis (monthly or annually) until canceled. By
            subscribing, you authorize us to charge the payment method provided
            on a recurring basis until you cancel.
          </p>
          <p className="mt-2">
            4.5. <strong>Subscription Changes:</strong> You may upgrade,
            downgrade, or cancel your subscription at any time through your
            account settings. Changes to subscriptions will take effect at the
            end of the current billing cycle.
          </p>
        </>
      ),
    },
    {
      id: "payments",
      title: "5. Payments and Billing",
      content: (
        <>
          <p>
            5.1. <strong>Payment Processing:</strong> All payments are processed
            securely through our third-party payment processor, Stripe. By
            providing payment information, you represent that you are authorized
            to use the payment method.
          </p>
          <p className="mt-2">
            5.2. <strong>Automatic Renewal:</strong> Subscriptions automatically
            renew at the end of each billing period unless canceled before the
            renewal date.
          </p>
          <p className="mt-2">
            5.3. <strong>Refund Policy:</strong> We offer a 7-day refund policy
            for first-time subscribers who are not satisfied with our premium
            services. To request a refund, contact us within 7 days of your
            initial subscription purchase. Beyond this period, refunds may be
            issued at our discretion for exceptional circumstances.
          </p>
          <p className="mt-2">
            5.4. <strong>Price Changes:</strong> We may modify subscription
            prices at any time. Price changes will be communicated in advance
            and will apply only to subsequent billing cycles, not the current
            billing period.
          </p>
        </>
      ),
    },
    {
      id: "user-content",
      title: "6. User Content",
      content: (
        <>
          <p>
            6.1. <strong>Ownership:</strong> You retain all rights to the User
            Content you create, upload, or store using our Service.
          </p>
          <p className="mt-2">
            6.2. <strong>License to CV Builder Pro:</strong> You grant CV
            Builder Pro a non-exclusive, worldwide, royalty-free license to use,
            store, display, reproduce, and modify your User Content solely for
            the purpose of providing and improving our Service.
          </p>
          <p className="mt-2">
            6.3. <strong>Responsibility for Content:</strong> You are solely
            responsible for your User Content and represent that you have all
            necessary rights to share this content. You agree not to create,
            upload, or share any content that:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Infringes on third-party intellectual property rights</li>
            <li>Contains false, misleading, or fraudulent information</li>
            <li>Violates any applicable law or regulation</li>
            <li>Contains malware, viruses, or other harmful computer code</li>
          </ul>
        </>
      ),
    },
    {
      id: "privacy",
      title: "7. Privacy and Data Protection",
      content: (
        <>
          <p>
            7.1. Our Privacy Policy describes how we collect, use, and protect
            your personal information. By using our Service, you consent to our
            data practices as described in our Privacy Policy.
          </p>
          <p className="mt-2">
            7.2. We implement reasonable security measures to protect your data,
            but cannot guarantee absolute security. You acknowledge that you
            provide your information at your own risk.
          </p>
        </>
      ),
    },
    {
      id: "intellectual-property",
      title: "8. Intellectual Property Rights",
      content: (
        <>
          <p>
            8.1. <strong>Our Intellectual Property:</strong> The Service,
            including its code, design, logos, trademarks, and content created
            by CV Builder Pro, is owned by us and protected by copyright,
            trademark, and other intellectual property laws.
          </p>
          <p className="mt-2">
            8.2. <strong>Limited License:</strong> We grant you a limited,
            non-exclusive, non-transferable, revocable license to use our
            Service for its intended purpose and in accordance with these Terms.
          </p>
          <p className="mt-2">
            8.3. <strong>Restrictions:</strong> You may not copy, modify,
            distribute, sell, or lease any part of our Service or included
            software. You also may not reverse engineer or attempt to extract
            the source code of our software.
          </p>
        </>
      ),
    },
    {
      id: "liability",
      title: "9. Limitation of Liability",
      content: (
        <>
          <p>
            9.1. To the maximum extent permitted by law, CV Builder Pro and its
            affiliates, officers, employees, agents, partners, and licensors
            will not be liable for any indirect, incidental, special,
            consequential, or punitive damages, including lost profits, data
            loss, or business interruption.
          </p>
          <p className="mt-2">
            9.2. Our total liability for any claims arising from or related to
            these Terms or our Service shall not exceed the amount you paid to
            us for the Service in the past 12 months, or $100 if you have not
            paid anything.
          </p>
        </>
      ),
    },
    {
      id: "disclaimers",
      title: "10. Disclaimers",
      content: (
        <>
          <p>
            10.1. The Service is provided "as is" and "as available" without
            warranties of any kind, either express or implied, including, but
            not limited to, implied warranties of merchantability, fitness for a
            particular purpose, or non-infringement.
          </p>
          <p className="mt-2">
            10.2. We do not warrant that the Service will be uninterrupted,
            secure, or error-free, that defects will be corrected, or that the
            Service or servers that make it available are free of viruses or
            other harmful components.
          </p>
          <p className="mt-2">
            10.3. CV Builder Pro does not guarantee that resumes created using
            our Service will result in job interviews or employment. The
            effectiveness of your resume depends on multiple factors beyond our
            control.
          </p>
        </>
      ),
    },
    {
      id: "termination",
      title: "11. Term and Termination",
      content: (
        <>
          <p>
            11.1. These Terms will remain in effect until terminated by either
            party.
          </p>
          <p className="mt-2">
            11.2. You may terminate these Terms by closing your account and
            discontinuing use of our Service.
          </p>
          <p className="mt-2">
            11.3. We may terminate or suspend your access to our Service
            immediately, without prior notice or liability, for any reason,
            including if you breach these Terms.
          </p>
          <p className="mt-2">
            11.4. Upon termination, your right to use the Service will
            immediately cease, but all provisions that by their nature should
            survive termination shall survive.
          </p>
        </>
      ),
    },
    {
      id: "changes",
      title: "12. Changes to Terms",
      content: (
        <>
          <p>
            12.1. We may modify these Terms at any time by posting the revised
            terms on our website. Your continued use of the Service after such
            changes constitutes your acceptance of the new Terms.
          </p>
          <p className="mt-2">
            12.2. For material changes, we will make reasonable efforts to
            provide notice via email or through the Service itself.
          </p>
        </>
      ),
    },
    {
      id: "governing-law",
      title: "13. Governing Law and Dispute Resolution",
      content: (
        <>
          <p>
            13.1. These Terms shall be governed by and construed in accordance
            with the laws of the United Kingdom, without regard to its conflict
            of law provisions.
          </p>
          <p className="mt-2">
            13.2. Any dispute arising from these Terms shall first be attempted
            to be resolved through informal negotiation. If unresolved, the
            dispute shall be subject to binding arbitration in London, United
            Kingdom, under the rules of the London Court of International
            Arbitration.
          </p>
        </>
      ),
    },
    {
      id: "general",
      title: "14. General Provisions",
      content: (
        <>
          <p>
            14.1. <strong>Entire Agreement:</strong> These Terms constitute the
            entire agreement between you and CV Builder Pro regarding your use
            of our Service.
          </p>
          <p className="mt-2">
            14.2. <strong>Severability:</strong> If any provision of these Terms
            is held to be invalid or unenforceable, such provision shall be
            struck and the remaining provisions shall be enforced.
          </p>
          <p className="mt-2">
            14.3. <strong>No Waiver:</strong> Our failure to enforce any right
            or provision of these Terms will not be considered a waiver of those
            rights.
          </p>
          <p className="mt-2">
            14.4. <strong>Assignment:</strong> You may not assign or transfer
            these Terms without our prior written consent, but we may assign our
            rights and obligations under these Terms without restriction.
          </p>
        </>
      ),
    },
    {
      id: "contact",
      title: "15. Contact Information",
      content: (
        <>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="mt-2 font-semibold">
            Email: legal@cvbuilderpro.com
            <br />
            Address: 123 Resume Road, London, UK, EC1A 1BB
          </p>
        </>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-b from-background to-muted/20"
    >
      <main className="mx-auto max-w-4xl p-6 pb-16 pt-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-10 space-y-4 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground">
            Effective Date: May 8, 2025
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Card className="mb-8 border-primary/20 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <ChevronDown className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">
                    Please read these Terms carefully before using CV Builder
                    Pro. By accessing or using our services, you agree to be
                    bound by these Terms. If you do not agree, please do not use
                    our services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table of Contents */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <Card className="border-primary/10">
              <CardContent className="pt-6">
                <h3 className="mb-4 text-lg font-semibold">
                  Table of Contents
                </h3>
                <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-left hover:bg-primary/10 hover:text-primary"
                        onClick={() => {
                          document
                            .getElementById(section.id)
                            ?.scrollIntoView({ behavior: "smooth" });
                          setActiveSection(section.id);
                        }}
                      >
                        <span className="mr-2 font-mono text-muted-foreground">
                          {index + 1}.
                        </span>{" "}
                        {section.title.split(". ")[1]}
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Terms Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    borderColor:
                      activeSection === section.id
                        ? "hsl(var(--primary))"
                        : "transparent",
                  }}
                  transition={{ duration: 0.3 }}
                  className="scroll-mt-4 rounded-lg border"
                >
                  <AccordionItem value={section.id} className="border-0">
                    <AccordionTrigger className="rounded-t-lg px-4 py-2 hover:bg-muted/50 data-[state=open]:bg-muted/30">
                      <h2 className="text-xl font-semibold">{section.title}</h2>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-2">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="prose prose-sm dark:prose-invert max-w-none"
                      >
                        {section.content}
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 border-t pt-8 text-center"
          >
            <p className="font-medium text-muted-foreground">
              By using CV Builder Pro, you acknowledge that you have read,
              understood, and agree to these Terms of Service.
            </p>
            <Button className="mt-6" variant="outline">
              <Link href={"/"}>Return to Homepage</Link>
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
}
