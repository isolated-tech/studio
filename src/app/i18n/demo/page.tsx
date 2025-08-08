import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Button } from '@/components/Button'

export default function I18nDemoPage() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-sm dark:bg-neutral-800">
              <span className="text-neutral-600 dark:text-neutral-400">What's new</span>
              <span className="font-medium">Just shipped v1.1</span>
            </div>
            
            <h1 className="text-5xl font-medium tracking-tight text-neutral-950 sm:text-7xl dark:text-white">
              Local + Effortless i18n Translation
            </h1>
            
            <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400">
              Translate your application's content into multiple languages with our local AI-powered translation tool.
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button href="#get-started">Get Started</Button>
              <Button href="#features" variant="secondary">
                Learn More
              </Button>
            </div>
          </div>

          <div className="mt-20 rounded-xl bg-neutral-900 p-8 dark:bg-neutral-800">
            <div className="mb-6 flex gap-2">
              {['eng_Latn', 'fra_Latn', 'hin_Deva', 'jpn_Jpan', 'spa_Latn', 'zho_Hans'].map((lang) => (
                <button
                  key={lang}
                  className="rounded-md bg-neutral-800 px-3 py-1 text-xs text-neutral-400 hover:bg-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                >
                  {lang}
                </button>
              ))}
            </div>
            
            <pre className="overflow-x-auto text-sm text-neutral-300">
              <code>{`{
  "landing": {
    "whatsNew": "What's new",
    "justShipped": "Just shipped",
    "hero": "Local + Effortless i18n Translation",
    "description": "Translate your application's content into multiple languages with our local AI-powered translation tool.",
    "cta": "Get Started",
    "learnMore": "Learn More"
  }
}`}</code>
            </pre>
          </div>

          <div id="features" className="mt-32">
            <h2 className="text-center text-3xl font-medium tracking-tight text-neutral-950 dark:text-white">
              Key Features
            </h2>
            
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-neutral-200 p-8 dark:border-neutral-800">
                <h3 className="text-lg font-semibold text-neutral-950 dark:text-white">
                  Multiple Languages
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Translate your content into 200+ languages with our comprehensive language support.
                </p>
              </div>
              
              <div className="rounded-2xl border border-neutral-200 p-8 dark:border-neutral-800">
                <h3 className="text-lg font-semibold text-neutral-950 dark:text-white">
                  Local-first Translation
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Keep your translation files safe and fully in your control. Our service only uses local-first models and will never communicate with a server.
                </p>
              </div>
              
              <div className="rounded-2xl border border-neutral-200 p-8 dark:border-neutral-800">
                <h3 className="text-lg font-semibold text-neutral-950 dark:text-white">
                  File Format Support
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Translate content into the popular file formats JSON, YAML, and JS/TS.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-32">
            <h2 className="text-center text-3xl font-medium tracking-tight text-neutral-950 dark:text-white">
              Pricing
            </h2>
            
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:mx-auto lg:max-w-4xl">
              <div className="rounded-2xl border border-neutral-200 p-8 dark:border-neutral-800">
                <p className="text-3xl font-bold text-neutral-950 dark:text-white">$0</p>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Free plan</p>
                
                <ul className="mt-8 space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Unlimited translations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-neutral-600 dark:text-neutral-400">203 supported languages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Two languages at a time</span>
                  </li>
                </ul>
                
                <Button href="#get-started" className="mt-8 w-full">
                  Get Started
                </Button>
              </div>
              
              <div className="rounded-2xl border-2 border-neutral-950 p-8 dark:border-white">
                <p className="text-3xl font-bold text-neutral-950 dark:text-white">$20</p>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">One-time purchase</p>
                
                <ul className="mt-8 space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Unlimited translations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-neutral-600 dark:text-neutral-400">203 supported languages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Translate to all languages in one click</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Customer support</span>
                  </li>
                </ul>
                
                <Button href="#" className="mt-8 w-full">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>

          <div id="get-started" className="mt-32 mb-32">
            <div className="rounded-2xl bg-neutral-950 p-12 text-center dark:bg-neutral-900">
              <h2 className="text-3xl font-medium tracking-tight text-white">
                Get Started with Our Translation Tool
              </h2>
              <p className="mt-4 text-lg text-neutral-400">
                Sign up for a free trial or request a demo to see how our translation tool can help your business.
              </p>
              
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full max-w-sm rounded-lg bg-white px-4 py-3 text-neutral-950 placeholder:text-neutral-500 sm:w-auto"
                />
                <Button href="#">Sign Up</Button>
              </div>
              
              <p className="mt-4 text-sm text-neutral-500">
                Sign up to get started or request a demo.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}