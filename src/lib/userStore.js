import fs from "fs";
import path from "path";

// Local persistent file path for users storage
const STORAGE_FILE = path.join(process.cwd(), ".data", "members.json");

// In-memory fallback if file system is read-only in some serverless environments
let memoryUsers = [
  {
    id: "usr_seed_1",
    name: "Sheikh Abdullah Rahim",
    email: "teacher@alhidayahcenter.org",
    passwordHash: "teacher123",
    role: "teacher",
    phone: "+1 (555) 234-5678",
    department: "Quran & Islamic Studies",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    status: "approved",
    serialId: "TCH-0001",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    approvedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "usr_seed_2",
    name: "Fatima Al-Mansoor",
    email: "student@alhidayahcenter.org",
    passwordHash: "student123",
    role: "student",
    phone: "+1 (555) 876-5432",
    department: "Arabic Language Level 2",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    status: "approved",
    serialId: "STU-0001",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    approvedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "usr_seed_3",
    name: "Omar Farooq",
    email: "omar.pending@example.com",
    passwordHash: "password123",
    role: "student",
    phone: "+1 (555) 345-6789",
    department: "Youth Quran Hifz Program",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    status: "pending",
    serialId: null,
    createdAt: new Date().toISOString(),
  },
];

function ensureStorageDir() {
  try {
    const dir = path.dirname(STORAGE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(STORAGE_FILE)) {
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(memoryUsers, null, 2), "utf8");
    }
  } catch (err) {
    console.warn("[UserStore] File storage init warning:", err?.message);
  }
}

export function readAllUsers() {
  try {
    ensureStorageDir();
    if (fs.existsSync(STORAGE_FILE)) {
      const data = fs.readFileSync(STORAGE_FILE, "utf8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        memoryUsers = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.warn("[UserStore] Reading from memory fallback:", err?.message);
  }
  return memoryUsers;
}

export function saveUsers(users) {
  memoryUsers = users;
  try {
    ensureStorageDir();
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(users, null, 2), "utf8");
  } catch (err) {
    console.warn("[UserStore] Save warning, using memory:", err?.message);
  }
}

export function findUserByEmail(email) {
  if (!email) return null;
  const users = readAllUsers();
  return users.find((u) => u.email?.toLowerCase() === email.trim().toLowerCase()) || null;
}

export function findUserById(id) {
  if (!id) return null;
  const users = readAllUsers();
  return users.find((u) => u.id === id) || null;
}

export function getNextSerialId(role) {
  const users = readAllUsers();
  const rolePrefix = role === "teacher" ? "TCH" : "STU";
  
  // Count how many verified users in this role currently have a serial ID
  const existingWithSerial = users.filter(
    (u) => u.role === role && u.serialId && u.serialId.startsWith(rolePrefix)
  );

  let maxNum = 0;
  existingWithSerial.forEach((u) => {
    const numPart = parseInt(u.serialId.replace(`${rolePrefix}-`, ""), 10);
    if (!isNaN(numPart) && numPart > maxNum) {
      maxNum = numPart;
    }
  });

  const nextNum = maxNum + 1;
  return `${rolePrefix}-${String(nextNum).padStart(4, "0")}`;
}

export function createUser({ name, email, password, role, phone, department, avatarUrl }) {
  const users = readAllUsers();
  const existing = users.find((u) => u.email?.toLowerCase() === email.trim().toLowerCase());
  if (existing) {
    throw new Error("An account with this email address already exists.");
  }

  const newUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passwordHash: password, // Simple string match for portal
    role: role === "teacher" ? "teacher" : "student",
    phone: phone?.trim() || "",
    department: department?.trim() || "",
    avatarUrl:
      avatarUrl?.trim() ||
      (role === "teacher"
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"),
    status: "pending", // All registrations start as pending until admin accepts
    serialId: null, // Assigned sequentially upon admin approval
    createdAt: new Date().toISOString(),
  };

  users.unshift(newUser);
  saveUsers(users);
  return sanitizeUser(newUser);
}

export function approveUser(userId) {
  const users = readAllUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) {
    throw new Error("Member not found.");
  }

  const target = users[index];
  if (!target.serialId) {
    target.serialId = getNextSerialId(target.role);
  }
  target.status = "approved";
  target.approvedAt = new Date().toISOString();

  users[index] = target;
  saveUsers(users);
  return sanitizeUser(target);
}

export function rejectUser(userId) {
  const users = readAllUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) {
    throw new Error("Member not found.");
  }

  users[index].status = "rejected";
  users[index].rejectedAt = new Date().toISOString();

  saveUsers(users);
  return sanitizeUser(users[index]);
}

export function deleteUser(userId) {
  const users = readAllUsers();
  const filtered = users.filter((u) => u.id !== userId);
  saveUsers(filtered);
  return true;
}

export function sanitizeUser(user) {
  if (!user) return null;
  const { passwordHash, ...safe } = user;
  return safe;
}
