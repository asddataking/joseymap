import { redirect } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { ProfileForm } from "@/components/ProfileForm";
import { getAuthState } from "@/lib/auth";

export const metadata = {
  title: "Profile — JoseyMap",
};

export default async function ProfilePage() {
  const { user, profile } = await getAuthState();

  if (!user || !profile) {
    redirect("/signup?redirect=/profile");
  }

  return (
    <main className="min-h-dvh bg-map-dark">
      <PageHeader title="Your Profile" backHref="/" backLabel="Home" />
      <div className="mx-auto max-w-lg px-4 py-6">
        <ProfileForm profile={profile} email={user.email ?? ""} />
      </div>
    </main>
  );
}
