import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import Dashboard from "../components/admin/Dashboard";
import { HandleNotAdmin } from "../components/buttons/Button";

export default async function Page() {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (session && session?.user?.role != "Admin") {
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
