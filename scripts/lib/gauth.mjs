import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ADC_PATH =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  path.join(os.homedir(), ".config/gcloud/application_default_credentials.json");

function readAdc() {
  return JSON.parse(fs.readFileSync(ADC_PATH, "utf8"));
}

/**
 * Mint a Vertex-scoped access token directly from Application Default
 * Credentials. Works without the gcloud binary when ADC is an authorized_user
 * (refresh-token) credential. Secrets never leave this process.
 */
export async function getAccessToken() {
  const adc = readAdc();
  if (adc.type !== "authorized_user") {
    throw new Error(
      `ADC type "${adc.type}" not supported here; expected authorized_user.`,
    );
  }
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: adc.client_id,
      client_secret: adc.client_secret,
      refresh_token: adc.refresh_token,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) {
    throw new Error(`token refresh failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()).access_token;
}

export function getProjectId() {
  return (
    process.env.GOOGLE_CLOUD_PROJECT ||
    process.env.ANTHROPIC_VERTEX_PROJECT_ID ||
    readAdc().quota_project_id
  );
}
