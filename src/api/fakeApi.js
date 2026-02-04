let callCount = 0;

export function fetchUserByKey(key, { shouldFail = false } = {}) {
  const currentCall = ++callCount;
  const delayMs = key === "1" ? 900 : key === "2" ? 250 : 500;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(
          new Error(`Simulated failure for key=${key} (call=${currentCall})`)
        );
        return;
      }

      resolve({
        key,
        name: key === "1" ? "Ada" : key === "2" ? "Linus" : "User " + key,
        call: currentCall,
        ts: Date.now(),
      });
    }, delayMs);
  });
}
