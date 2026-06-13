import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MealMind — Smart Meal Planning Dashboard",
    template: "%s | MealMind",
  },
  description:
    "Plan your weekly meals, manage grocery lists, track your food budget, and organize cooking tasks — all in one beautiful dashboard.",
  keywords: ["meal planning", "grocery list", "budget tracker", "cooking", "recipe"],
  authors: [{ name: "MealMind" }],
  creator: "MealMind",
  openGraph: {
    title: "MealMind — Smart Meal Planning Dashboard",
    description:
      "Plan your weekly meals, manage grocery lists, track your food budget, and organize cooking tasks.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
