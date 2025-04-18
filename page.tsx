import Link from "next/link"
import { ArrowRight, Brain, Clock, FileText, LineChart, Medal, Moon, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MedPrep</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Ace Your NEET Preparation with <span className="text-primary">MedPrep</span>
            </h1>
            <p className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
              The ultimate platform for medical science and NEET aspirants. Practice questions, track your progress, and
              improve your performance with detailed analytics.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="gap-1.5">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="container py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
              Features Designed for Success
            </h2>
            <p className="max-w-[46rem] text-lg text-muted-foreground">
              Everything you need to excel in your medical entrance exams
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: FileText,
                title: "Comprehensive Question Bank",
                description: "Access thousands of NEET-focused questions across all subjects",
              },
              {
                icon: Clock,
                title: "Question Timer",
                description: "Track time spent on each question to improve your speed",
              },
              {
                icon: LineChart,
                title: "Detailed Analytics",
                description: "Get insights into your performance with comprehensive reports",
              },
              {
                icon: Medal,
                title: "Streaks & Badges",
                description: "Stay motivated with achievement tracking and rewards",
              },
              {
                icon: Moon,
                title: "Night Mode",
                description: "Reduce eye strain during late-night study sessions",
              },
              {
                icon: Users,
                title: "Leaderboards",
                description: "Compare your performance with peers and track your ranking",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 text-center shadow-sm"
              >
                <div className="rounded-full bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">Track Your Progress</h2>
              <p className="text-lg text-muted-foreground">
                Our detailed analytics help you identify your strengths and weaknesses, allowing you to focus your study
                efforts where they matter most.
              </p>
              <ul className="grid gap-2">
                {[
                  "Subject-wise performance breakdown",
                  "Time management analysis",
                  "Accuracy metrics",
                  "Progress over time visualization",
                  "Personalized improvement suggestions",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/auth/register" className="mt-4">
                <Button>Start Tracking Now</Button>
              </Link>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4 shadow-sm">
              <div className="aspect-video rounded-md bg-muted" />
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/50">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MedPrep</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} MedPrep. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
