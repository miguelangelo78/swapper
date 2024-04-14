
// We need to create a page that will be shown to the user if they have not setup their profile yet.
// The user can only progress to the matcher page if they have setup their profile first.

import Layout from "@/components/Layout";
import { sessionUser } from "@/lib/utils";
import { checkUserSetup } from "../db";
import { redirect } from "next/navigation";

// We can reuse the Layout component from the matcher page.

export default async function SetupPage() {
  const user = await sessionUser();

  const setupComplete = await checkUserSetup(user.email!);

  if (setupComplete) {
    // Redirect to matcher page if user has not completed setup
    redirect('/matcher');
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="text-4xl font-bold mb-20">Welcome, {user.name}!</div>
        <div className="text-2xl mb-10 text-primary font-medium">Please setup your profile first!</div>
        <div className="flex flex-wrap justify-center">
        </div>
      </div>
    </Layout>
  );
}
