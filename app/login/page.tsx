import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="mx-auto w-full max-w-md border-border/70 bg-white py-0 shadow-sm">
        <CardHeader className="pt-6 pb-2">
          <CardTitle className="font-heading text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to continue your reading journey.</CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <form className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="name@email.com" className="h-10" />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input id="password" type="password" placeholder="Enter your password" className="h-10" />
            </div>

            <Button type="submit" className="mt-2 h-10 w-full rounded-full">
              Login
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link href="/books" className="font-medium text-foreground underline-offset-4 hover:underline">
              Browse books first
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}