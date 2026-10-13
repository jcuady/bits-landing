/**
 * Shared test-server bootstrap.
 *
 * WHY THIS EXISTS
 * ---------------
 * Three browser suites need a running Next server. Only one of them started its
 * own. `scripts/crm-e2e.mjs` did; `responsive-validation.mjs` and
 * `keyboard-validation.mjs` hard-coded http://localhost:3847 and assumed someone
 * had started a server first.
 *
 * The failure mode that produced is worse than a missing feature. Running
 *
 *     npm run test:keyboard
 *
 * with nothing listening printed a raw Playwright stack trace ending in
 * ERR_CONNECTION_REFUSED. That reads as a broken test, not a missing
 * prerequisite, so the natural response is to go debug the test. In fact both
 * suites pass; `npm run test:crm`, which starts its own server, had been run
 * repeatedly while these two were simply never runnable without ceremony.
 *
 * So: one bootstrap, used by all three. Each suite gets its own free port, so
 * they cannot collide with each other or with a dev server.
 *
 * A base URL supplied by the caller (RESPONSIVE_BASE_URL / an explicit argument)
 * always wins, so pointing a suite at a deployed instance still works.
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import http from "node:http";
import net from "node:net";

const require = createRequire(import.meta.url);

function getFreePort() {
  return new Promise((resolve, reject) => {
    const s = net.createServer();
    s.listen(0, "127.0.0.1", () => {
      const addr = s.address();
      const port = typeof addr === "object" && addr ? addr.port : 0;
      s.close((err) => (err ? reject(err) : resolve(port)));
    });
    s.on("error", reject);
  });
}

function waitForServer(base, ms = 45000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(base + "/login", (res) => {
        res.resume();
        resolve();
      });
      req.on("error", () => {
        if (Date.now() - start > ms) {
          reject(
            new Error(
              `Server did not start at ${base} within ${ms / 1000}s. ` +
                `Run \`npm run build\` first — \`next start\` serves the build output, not the source.`
            )
          );
        } else setTimeout(tick, 400);
      });
    };
    tick();
  });
}

/**
 * Return `{ base, stop }`.
 *
 * If `explicitBase` is set, no server is started and `stop` is a no-op — the
 * caller pointed us at an instance they are managing themselves.
 *
 * `next start` serves `.next`, so a missing or stale build surfaces here as a
 * clear message rather than as a connection error 45 seconds later.
 */
export async function startServer({ explicitBase, label = "test suite" } = {}) {
  if (explicitBase) {
    console.log(`${label}: using ${explicitBase}`);
    return { base: explicitBase.replace(/\/$/, ""), stop: async () => {} };
  }

  const nextBin = require.resolve("next/dist/bin/next");
  const port = await getFreePort();
  const base = `http://127.0.0.1:${port}`;

  const server = spawn(process.execPath, [nextBin, "start", "-p", String(port), "-H", "127.0.0.1"], {
    cwd: process.cwd(),
    stdio: ["ignore", "pipe", "pipe"],
  });

  let exited = null;
  server.on("exit", (code) => {
    exited = code;
  });

  let stderr = "";
  server.stderr?.on("data", (d) => {
    stderr += d.toString();
  });

  try {
    await waitForServer(base);
  } catch (e) {
    server.kill();
    if (exited !== null) {
      throw new Error(`${label}: \`next start\` exited with code ${exited}.\n${stderr.trim().slice(0, 600)}`);
    }
    throw e;
  }

  console.log(`${label}: started next start on ${base}`);
  return {
    base,
    stop: async () => {
      if (exited === null) server.kill();
    },
  };
}