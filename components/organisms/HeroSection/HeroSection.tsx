"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const expertise = [
  "Reverse engineering",
  "UX strategy",
  "Product engineering",
  "Frontend engineering",
  "Experiments",
];

const metrics = [
  { value: "05+", label: "Years building products" },
  { value: "03", label: "Active experiments" },
  { value: "10+", label: "Mentees" },
];

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const specimenRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const specimen = specimenRef.current;
    const onMove = (event: MouseEvent) => {
      if (!specimen) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * -14;

      gsap.to(specimen, {
        x,
        y,
        rotateX: y * 0.18,
        rotateY: x * 0.24,
        duration: 0.9,
        ease: "power3.out",
      });
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-reveal]",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09 },
      ).fromTo(
        flowerRef.current,
        { autoAlpha: 0, rotate: -140, scale: 0.72 },
        { autoAlpha: 1, rotate: 0, scale: 1, duration: 1.4 },
        "-=0.7",
      );

      gsap.to(flowerRef.current, {
        rotate: 360,
        duration: 24,
        ease: "none",
        repeat: -1,
      });

      tl.fromTo(
        specimen,
        { autoAlpha: 0, scale: 0.86, rotateZ: -5 },
        { autoAlpha: 1, scale: 1, rotateZ: -2, duration: 1.2 },
        "-=0.9",
      );
    }, heroRef);

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative isolate min-h-screen overflow-hidden bg-[#070809] px-5 pb-8 pt-24 text-[#F2F0E9] sm:px-8 lg:px-14"
    >
      <div
        className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_52%_47%,rgba(224,168,198,0.13),transparent_36%),linear-gradient(180deg,#070809_0%,#100B0E_58%,#070809_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-[48%] -z-20 h-[min(72vw,760px)] w-[min(72vw,760px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F2F0E9]/8"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-[48%] -z-20 h-[min(54vw,570px)] w-[min(54vw,570px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E0A8C6]/10"
        aria-hidden="true"
      />

      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.2fr_0.75fr] lg:grid-rows-[auto_1fr_auto]">
        <div data-hero-reveal className="relative z-20 lg:col-span-2 lg:row-start-1">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#E0A8C6] md:text-xs">
            Winfred Kagendo / Engineering Lab - Nairobi
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(4rem,10vw,9.375rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-[#F2F0E9]">
            Winfred Kagendo
          </h1>
          <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-[#B9B3B8] md:text-xl">
            Senior Frontend & Product Engineer
          </p>
        </div>

        <p
          data-hero-reveal
          className="relative z-20 max-w-sm font-body text-base leading-relaxed text-[#B9B3B8] md:text-lg lg:absolute lg:right-14 lg:top-60 lg:max-w-[18rem] lg:text-right xl:right-20"
        >
          A working archive of systems I&apos;m designing, assumptions I&apos;m testing and products I&apos;m shipping across frontend, backend and UX.
        </p>

        <div className="relative z-10 min-h-[420px] lg:col-span-3 lg:row-start-2 lg:min-h-0">
          <div
            ref={specimenRef}
            className="absolute left-1/2 top-1/2 h-[min(68vw,560px)] w-[min(68vw,560px)] -translate-x-1/2 -translate-y-1/2 opacity-95 will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
            aria-hidden="true"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/image/3d.png"
              alt=""
              className="h-full w-full object-contain drop-shadow-[0_36px_80px_rgba(0,0,0,0.55)]"
            />
          </div>
          <div
            ref={flowerRef}
            className="absolute left-[13%] top-[12%] z-20 h-16 w-16 opacity-0 sm:h-20 sm:w-20 lg:left-[58%] lg:top-[8%]"
            style={{ transformOrigin: "center center" }}
            aria-hidden="true"
          >
            {/* <Image
              src="/image/flower.jpg"
              alt=""
              width={120}
              height={120}
              className="h-full w-full rounded-sm object-cover opacity-85 mix-blend-screen"
              priority
            /> */}
          </div>
        </div>

        <div data-hero-reveal className="relative text-right z-20 max-w-[min(92vw,760px)] justify-self-end lg:col-span-2 lg:row-end-3 lg:self-end">
          <h4 className="text-right font-display text-[clamp(2.75rem,5.6vw,6rem)]  font-semibold leading-[0.88] tracking-[-0.055em] text-[#F2F0E9]">
            Engineering
            <span className="block text-right text-[#E0A8C6]">
              in public.
            </span>
          </h4>

        
        </div>

        <div data-hero-reveal className="relative z-20 grid gap-5 sm:grid-cols-1 lg:absolute lg:bottom-12 lg:left-14 lg:max-w-[170px] xl:left-20">
          {metrics.map((metric) => (
            <div key={metric.label} className="lg:border-l lg:border-[#F2F0E9]/12 lg:pl-4">
              <p className="font-display text-4xl font-medium leading-none tracking-[-0.04em] text-[#F2F0E9]">
                {metric.value}
              </p>
              <p className="mt-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[#858B92]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* <div data-hero-reveal className="relative z-20 flex flex-col gap-3 sm:flex-row lg:col-start-3 lg:row-start-3 lg:self-end lg:justify-end">
          <Link
            href="#projects"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E0A8C6]/45 bg-[#E0A8C6] px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] text-[#15100F] transition hover:bg-[#E8B6CF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E0A8C6]"
          >
            Explore experiments
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="#blog"
            className="inline-flex items-center justify-center rounded-full border border-[#F2F0E9]/14 px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.1em] text-[#D7D3C8] transition hover:border-[#E0A8C6]/45 hover:text-[#E0A8C6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E0A8C6]"
          >
            Read notes
          </Link>
        </div> */}
      </div>
    </section>
  );
}
