"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const roles = ["software engineer", "founder", "builder", "writer", "teacher"];

function subscribeReducedMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function TypedRole() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [animatedText, setAnimatedText] = useState("");
  const text = reducedMotion ? "software engineer & founder" : animatedText;

  useEffect(() => {
    if (reducedMotion) return;

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      const word = roles[roleIndex];

      if (!deleting) {
        charIndex += 1;
        setAnimatedText(word.slice(0, charIndex));
        if (charIndex === word.length) {
          deleting = true;
          timeout = setTimeout(tick, 1400);
          return;
        }
        timeout = setTimeout(tick, 62);
        return;
      }

      charIndex -= 1;
      setAnimatedText(word.slice(0, charIndex));
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timeout = setTimeout(tick, 260);
        return;
      }
      timeout = setTimeout(tick, 34);
    }

    timeout = setTimeout(tick, 650);
    return () => clearTimeout(timeout);
  }, [reducedMotion]);

  return (
    <div className="role reveal d2" aria-label="Software engineer and founder">
      <span className="prompt">&gt;</span>
      <span>{text}</span>
      {!reducedMotion && <span className="cursor" aria-hidden="true" />}
    </div>
  );
}
