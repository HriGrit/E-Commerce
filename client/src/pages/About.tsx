/**
 * @file About.js
 * @description About page outlining company information.
 */
export default function About() {
  return (
    <div className="flex flex-col">
      <main className="flex-1 py-12 md:py-24">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
              About Us
            </h1>
            <p className="max-w-[700px] text-gray-700 md:text-xl">
              We&apos;re an online E-commerce application
            </p>
          </div>

          <div className="mx-auto grid max-w-3xl items-start gap-4 lg:max-w-5xl lg:grid-cols-2">
            <div className="flex flex-col items-center justify-center space-y-4 text-center lg:items-start lg:text-left">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Our Story
              </h2>
              <p className="max-w-prose text-gray-700 md:text-xl">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
              </p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4 text-center lg:items-start lg:text-left">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Our Mission
              </h2>
              <p className="max-w-prose text-gray-700 md:text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}