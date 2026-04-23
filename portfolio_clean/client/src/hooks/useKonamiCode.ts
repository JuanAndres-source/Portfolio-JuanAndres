import { useEffect } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode(callback: () => void) {
  useEffect(() => {
    let keySequence: string[] = [];

    const handleKeyDown = (event: KeyboardEvent) => {
      // Get the key name, handling arrow keys specially
      let key = event.key;
      if (event.code.startsWith("Arrow")) {
        key = event.code;
      }

      keySequence.push(key.toLowerCase());

      // Keep only the last 10 keys
      if (keySequence.length > KONAMI_CODE.length) {
        keySequence.shift();
      }

      // Check if the sequence matches the Konami code
      if (keySequence.length === KONAMI_CODE.length) {
        const matches = keySequence.every((key, index) =>
          key === KONAMI_CODE[index].toLowerCase()
        );

        if (matches) {
          callback();
          keySequence = [];
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [callback]);
}
