import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="w-full px-2 mx-auto max-w-screen-xl md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter text-balance sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground/70">
                The best NextJS <br />
                Starter Template
              </h1>
              <p className="text-muted-foreground  mx-auto">
                Comes with ShadCN UI, theme toggle too! Accelerate your
                development process with this template.
              </p>
            </div>
            <div className="flex gap-4 px-2">
              <Button className="max-w-fit">Login</Button>
              <Button asChild className="max-w-fit" variant="outline">
                <Link href="https://github.com/UjjwalSaini07">
                  Github
                </Link>
              </Button>
            </div>
          </div>
          <Image
            alt="Hero"
            className="mx-auto shadow-md aspect-video overflow-hidden rounded-xl object-cover object-bottom sm:w-full lg:order-last"
            height={310}
            src="https://www.shutterstock.com/image-photo/dnipro-ukraine-31-jan-2024-600nw-2432138019.jpg"
            width={550}
          />
        </div>
      </div>
    </section>
  );
}
