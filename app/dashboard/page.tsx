import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import Dashboard from "../components/admin/Dashboard";
import { HandleNotAdmin } from "../components/buttons/Button";

export default async function Page() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const allowedRoles = ["Admin", "President"];
  if (session && !allowedRoles.includes(session?.user?.role ?? "")) {
    return (
      <>
        <HandleNotAdmin />
      </>
    );
  }
  return (
    <div>
      <Dashboard />
    </div>
  );
}
