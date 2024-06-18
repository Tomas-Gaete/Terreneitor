import { signIn } from "@/auth.js"
export function Signin() {
    return (
      <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
    )
  } 