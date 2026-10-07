import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const getSecretKey = () => {
  const secret = process.env.SESSION_SECRET || "default_development_secret_key_change_in_production";
  return new TextEncoder().encode(secret);
};

export const ADMIN_COOKIE_NAME = "admin_session";
export const USER_COOKIE_NAME = "member_session";

/**
 * Sign an encrypted session token for an authenticated admin.
 */
export async function createAdminToken(payload = {}) {
  const secret = getSecretKey();
  return await new SignJWT({ role: "admin", ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

/**
 * Sign an encrypted session token for a student or teacher.
 */
export async function createUserToken(user = {}) {
  const secret = getSecretKey();
  return await new SignJWT({
    id: user.id || user._id,
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status,
    memberId: user.memberId || user.serialId || null,
    backendToken: user.backendToken || user.token || null,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

/**
 * Verify session token from a Next.js Request or from next/headers cookies.
 */
export async function verifyAdminSession(req) {
  try {
    let token = null;

    if (req && req.cookies && typeof req.cookies.get === "function") {
      token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    }

    if (!token && req && typeof req.headers?.get === "function") {
      const cookieHeader = req.headers.get("cookie");
      if (cookieHeader) {
        const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE_NAME}=([^;]*)`));
        if (match) {
          token = decodeURIComponent(match[1]);
        }
      }
    }

    if (!token) {
      try {
        const cookieStore = await cookies();
        token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
      } catch {
        // cookies() may throw outside Next.js request context
      }
    }

    if (!token) return null;

    const secret = getSecretKey();
    const { payload } = await jwtVerify(token, secret);

    if (payload?.role !== "admin") return null;

    return payload;
  } catch (err) {
    console.error("[Admin Auth Verification Error]", err?.message || "Invalid session");
    return null;
  }
}

/**
 * Centrally construct authenticated backend headers for server-to-server requests to AIC_SERVER.
 * Ensures the request forwards:
 * 1. Admin API Key in x-admin-key and x-admin-api-key headers
 * 2. Authorization: Bearer <backendToken || adminApiKey>
 */
export function getBackendAdminHeaders(adminSession = null, extraHeaders = {}) {
  const adminApiKey = process.env.ADMIN_API_KEY;
  // Prioritize backend JWT token if issued by AIC_SERVER on login; fallback to configured ADMIN_API_KEY
  const bearerToken = adminSession?.backendToken || adminApiKey;

  const headers = {
    "Content-Type": "application/json",
    ...extraHeaders,
  };

  if (adminApiKey) {
    headers["x-admin-key"] = adminApiKey;
    headers["x-admin-api-key"] = adminApiKey;
  }

  if (bearerToken) {
    headers["Authorization"] = `Bearer ${bearerToken}`;
  }

  return headers;
}

/**
 * Verify Member session (Student / Teacher).
 */
export async function verifyUserSession(req) {
  try {
    let token = null;

    if (req && req.cookies && typeof req.cookies.get === "function") {
      token = req.cookies.get(USER_COOKIE_NAME)?.value;
    }

    if (!token && req && typeof req.headers?.get === "function") {
      const cookieHeader = req.headers.get("cookie");
      if (cookieHeader) {
        const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${USER_COOKIE_NAME}=([^;]*)`));
        if (match) {
          token = decodeURIComponent(match[1]);
        }
      }
    }

    if (!token) {
      try {
        const cookieStore = await cookies();
        token = cookieStore.get(USER_COOKIE_NAME)?.value;
      } catch {
        // cookies() may throw outside Next.js request context
      }
    }

    if (!token) return null;

    const secret = getSecretKey();
    const { payload } = await jwtVerify(token, secret);

    return payload;
  } catch (err) {
    return null;
  }
}
