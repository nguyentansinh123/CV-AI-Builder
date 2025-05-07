import React from "react";
import Navbar from "../../components/global/navbar/Navbar";
import PremiumModal from "@/components/global/premium/PremiumModal";
import { auth } from "@clerk/nextjs/server";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import SubscriptionLevelProvider from "@/actions/context/SupcriptionContextProvider";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {

  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const userSubscriptionLevel = await getUserSubscriptionLevel(userId);

  return (
    <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {children}
        <PremiumModal />
      </div>
    </SubscriptionLevelProvider>
  );
};

export default layout;
