import exp from "constants";

class Env {
  static APP_URL: string =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export default Env;
