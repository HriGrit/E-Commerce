/**
 * @file About.js
 * @description About page outlining company information.
 */
export default function Contact() {
  return (
    <div className="flex flex-col">
      <main className="flex-1 py-12 md:py-24">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
              Contact Us
            </h1>
            <p className="max-w-[700px] text-gray-700 md:text-xl">
              We would to hear from you!
            </p>
          </div>

          <div className="mx-auto grid max-w-3xl items-start gap-4 lg:max-w-5xl lg:grid-cols-2">
            <div className="flex flex-col items-center justify-center space-y-4 text-center lg:items-start lg:text-left">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Call us at
              </h2>
              <a href="tel:+10000000000" className="max-w-prose text-gray-700 md:text-xl">
                +1-000-000-0000
              </a>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4 text-center lg:items-start lg:text-left">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Mail us at
              </h2>
              <a href="mailto:e-commerce@gmail.com" className="max-w-prose text-gray-700 md:text-xl">
                e-commerce@gmail.com
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}