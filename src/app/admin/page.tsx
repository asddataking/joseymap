import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata = {
  title: "Admin — JoseyMap",
};

export default function AdminPage() {
  return (
    <main className="min-h-dvh bg-map-dark">
      <AdminDashboard />
    </main>
  );
}
