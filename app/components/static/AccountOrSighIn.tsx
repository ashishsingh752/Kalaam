import { useSession } from "next-auth/react";
import { HandleAccountButton, HandleLoginButtom } from "../buttons/Button";

export default function AccountOrSignIn() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {!session ? (
        <div className="flex mt-1 w-full justify-center">
          <HandleLoginButtom/>
        </div>
      ) : (
        <HandleAccountButton />
      )}
    </div>
  );
}
