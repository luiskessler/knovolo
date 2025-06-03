import React from "react";
import HeroSectionComponent from "./_components/marketing/hero";
import DashboardShowcaseSectionComponent from "./_components/marketing/dashboardShowcase";
import FeaturesSectionComponent from "./_components/marketing/features";
import BrandsSectionComponent from "./_components/marketing/brands";
import KnowledgebaseSectionComponent from "./_components/marketing/knowledge-base";
import PricePlanSectionComponent from "./_components/marketing/pricingPlans";
import FAQSectionComponent from "./_components/marketing/faq";
import FooterSectionComponent from "./_components/marketing/footer";
import EarlyAdoptersNewsletterSectionComponent from "./_components/marketing/earlyAdoptersNewsletter";

export default function Page() {
  return (
    <div className="hide-scrollbar flex flex-col">
      <HeroSectionComponent />
      <DashboardShowcaseSectionComponent />
      <BrandsSectionComponent />
      <KnowledgebaseSectionComponent />
      <FeaturesSectionComponent />
      <PricePlanSectionComponent />
      <EarlyAdoptersNewsletterSectionComponent />
      <FAQSectionComponent />
      <FooterSectionComponent />
    </div>
  );
}
