import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Container, btnPrimary, btnSecondary } from "@/components/site/Primitives";
import { LogoMark } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-[#fafafa]">
      <Nav />
      <main id="main">
        <Container>
          <section className="flex min-h-[60vh] flex-col items-start justify-center py-24">
            <LogoMark size="lg" className="h-20 w-20 text-[#525252]" />
            <p className="font-mono-index mt-10 text-xs uppercase text-[#6ee7b7]">404 · Not found</p>
            <h1 className="mt-4 max-w-xl text-4xl font-medium tracking-tight text-balance md:text-5xl">
              This page isn't part of the structure.
            </h1>
            <p className="mt-4 max-w-md text-base text-[#a3a3a3]">
              The link may be old, or the page may have moved. Entity setup now lives at /setup.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className={btnPrimary}>
                Back to home
              </Link>
              <Link href="/docs" className={btnSecondary}>
                Read the docs
              </Link>
              <a href="/skill.md" className={btnSecondary}>
                /skill.md
              </a>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
