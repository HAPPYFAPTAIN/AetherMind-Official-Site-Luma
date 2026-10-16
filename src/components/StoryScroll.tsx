"use client";

import {useLayoutEffect} from "react";
import {gsap, ScrollTrigger} from "@/lib/gsap";
import {storyHoldDistance} from "@/lib/story-scroll";

/** Short scroll-distance holds; native wheel/touch input always remains available. */
export function StoryScroll() {
  useLayoutEffect(() => {
    const hero = document.querySelector<HTMLElement>(".science-hero");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-story-section]"));
    const main = hero?.closest("main");
    if (!hero || !main || !sections.length) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      // Create in document order so later triggers include preceding hold space.
      // The picture stays still while scrollY advances; taller sections then
      // resume normal reading without skipping any of their content.
      const holds = sections.map(section => ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${storyHoldDistance(window.innerHeight, section.id)}`,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onRefresh: self => {
          section.dataset.storyHold = JSON.stringify({start: self.start, end: self.end});
        },
      }));

      // Native sticky inside a GSAP pin double-counts the parent's hold distance
      // when the parent switches from fixed to transformed document flow.
      // Drive the desktop copy from the parent's release point instead.
      const copyMedia = gsap.matchMedia();
      copyMedia.add("(min-width: 1024px)", () => {
        sections.forEach((section, index) => {
          const copy = section.querySelector<HTMLElement>("[data-story-sticky-copy]");
          const grid = section.querySelector<HTMLElement>("[data-story-sticky-grid]");
          if (!copy || !grid) return;
          gsap.set(copy, {position: "relative", top: 0});
          const gridTop = () => grid.getBoundingClientRect().top - section.getBoundingClientRect().top;
          // Center the complete copy block in the reading area below the nav.
          const restingTop = () => Math.max(104, (window.innerHeight + 72 - copy.offsetHeight) / 2);
          const travel = () => copy.offsetHeight > window.innerHeight - 128
            ? 0 : Math.max(0, grid.offsetHeight - copy.offsetHeight);
          const base = () => Math.max(0, Math.min(travel(), restingTop() - gridTop()));
          const start = () => holds[index].end + Math.max(0, gridTop() + base() - restingTop());
          gsap.fromTo(copy, {y: base}, {
            y: travel, ease: "none",
            scrollTrigger: {
              start,
              end: () => start() + Math.max(1, travel() - base()),
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
      });

      // Each effect starts when its own content arrives, including long mobile sections.
      sections.forEach((section, index) => {
        const copyReveal = section.querySelector<HTMLElement>("[data-story-copy-reveal]");
        if (copyReveal) {
          gsap.fromTo(copyReveal, {
            opacity: .04,
            y: () => Math.min(140, Math.max(72, window.innerHeight * .12)),
          }, {
            opacity: 1, y: 0, ease: "power2.out",
            scrollTrigger: {
              start: () => holds[index].start - Math.min(160, window.innerHeight * .18),
              end: () => holds[index].start + Math.min(280, (holds[index].end - holds[index].start) * .5),
              scrub: .3,
              invalidateOnRefresh: true,
            },
          });
        }
        const backdrop = section.querySelector<HTMLElement>("[data-story-backdrop]");
        if (backdrop) {
          const direction = backdrop.dataset.storyBackdrop;
          const drift = direction === "left" ? -1.4 : direction === "right" ? 1.4 : 0;
          gsap.fromTo(backdrop, {scale: 1.035, xPercent: -drift, yPercent: .5}, {
            scale: direction === "approach" ? 1.12 : 1.065,
            xPercent: drift, yPercent: -.5, ease: "none",
            scrollTrigger: {
              start: () => holds[index].start,
              end: () => holds[index].end,
              scrub: .25,
              invalidateOnRefresh: true,
            },
          });
        }
        section.querySelectorAll<HTMLElement>("[data-story-stagger]").forEach(group => {
          gsap.fromTo(group.children, {opacity: 0, y: 16}, {
            opacity: 1, y: 0, duration: .55, stagger: .07, ease: "power2.out",
            scrollTrigger: {pinnedContainer: section, trigger: group.closest("[data-story-scale]") ?? group, start: "top 95%", toggleActions: "restart pause restart reset"},
          });
        });
        section.querySelectorAll<HTMLElement>("[data-story-panel]").forEach(panel => {
          gsap.fromTo(panel, {scale: .965}, {
            scale: 1, duration: .85, ease: "power2.out",
            scrollTrigger: {pinnedContainer: section, trigger: panel, start: "top 84%", toggleActions: "restart pause restart reset"},
          });
        });
        section.querySelectorAll<SVGPathElement>("[data-story-draw]").forEach(path => {
          gsap.fromTo(path, {strokeDasharray: 1, strokeDashoffset: 1}, {
            strokeDashoffset: 0, duration: 1.5, ease: "power2.out",
            scrollTrigger: {pinnedContainer: section, trigger: path.closest("svg"), start: "top 88%", toggleActions: "restart pause restart reset"},
          });
        });
        section.querySelectorAll<HTMLElement>("[data-story-rail]").forEach(rail => {
          gsap.fromTo(rail, {scaleX: 0, transformOrigin: "left"}, {
            scaleX: 1, duration: 1.3, ease: "power2.out",
            scrollTrigger: {pinnedContainer: section, trigger: rail.closest("[data-story-scale]") ?? rail.parentElement, start: "top 95%", toggleActions: "restart pause restart reset"},
          });
        });
        section.querySelectorAll<HTMLElement>("[data-story-scale-cursor]").forEach(cursor => {
          gsap.fromTo(cursor, {left: "0%"}, {
            left: "100%", duration: 1.6, ease: "power2.inOut",
            scrollTrigger: {pinnedContainer: section, trigger: cursor.closest("[data-story-scale]") ?? cursor.parentElement, start: "top 95%", toggleActions: "restart pause restart reset"},
          });
        });
      });

      let refreshTimer = 0;
      const observer = new ResizeObserver(() => {
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 160);
      });
      sections.forEach(section => observer.observe(section));
      return () => {
        copyMedia.revert();
        holds.forEach(hold => hold.kill());
        observer.disconnect();
        window.clearTimeout(refreshTimer);
        sections.forEach(section => { delete section.dataset.storyHold; });
      };
    });
    return () => media.revert();
  }, []);
  return null;
}

