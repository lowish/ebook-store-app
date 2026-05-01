import { SignUp } from "@clerk/nextjs";

import { AuthShell } from "../../_components/auth-shell";

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create your Readora account"
      subtitle="Join to access free trial books and explore your library."
    >
      <SignUp
        routing="path"
        path="/client/auth/sign-up"
        signInUrl="/client/auth/sign-in"
        appearance={{
          layout: {
            socialButtonsPlacement: "top",
            socialButtonsVariant: "blockButton",
            showOptionalFields: false,
          },
          elements: {
            card: "w-full rounded-[2rem] border border-border/70 bg-background/95 p-3 shadow-[0_24px_80px_-30px_rgba(0,0,0,0.25)] backdrop-blur sm:p-5",
            rootBox: "w-full",
            headerTitle: "sr-only",
            headerSubtitle: "sr-only",
            socialButtonsBlockButton:
              "h-11 rounded-xl border-border/70 bg-background text-foreground shadow-none",
            dividerLine: "bg-border/70",
            dividerText: "text-muted-foreground",
            formButtonPrimary:
              "h-11 rounded-xl bg-foreground text-background shadow-none transition hover:bg-foreground/90",
            formFieldInput:
              "h-11 rounded-xl border-border/70 bg-background shadow-none focus-visible:ring-2 focus-visible:ring-ring/40",
            footerActionLink: "text-red-600 hover:text-red-700",
          },
        }}
      />
    </AuthShell>
  );
}
