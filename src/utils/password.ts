/**
 * 비밀번호를 PBKDF2로 해시화 (salt + iterations 사용)
 */
export async function hashPassword(password: string): Promise<string> {
  // 랜덤 salt 생성 (16 bytes)
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const encoder = new TextEncoder();
  const passwordData = encoder.encode(password);

  // PBKDF2 키 생성
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    passwordData,
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  // PBKDF2로 해시 생성 (100,000 iterations)
  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    256 // 256 bits = 32 bytes
  );

  // salt와 hash를 결합하여 저장 (salt:hash 형식)
  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${saltHex}:${hashHex}`;
}

/**
 * 비밀번호 검증 (타이밍 공격 방지)
 */
export async function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  try {
    // 저장된 salt와 hash 분리
    const [saltHex, originalHashHex] = storedHash.split(":");
    if (!saltHex || !originalHashHex) {
      return false;
    }

    // salt를 Uint8Array로 변환
    const salt = new Uint8Array(
      saltHex.match(/.{2}/g)!.map((byte) => parseInt(byte, 16))
    );

    const encoder = new TextEncoder();
    const passwordData = encoder.encode(password);

    // 동일한 salt로 입력된 비밀번호 해시화
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      passwordData,
      "PBKDF2",
      false,
      ["deriveBits"]
    );

    const hashBuffer = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      256
    );

    const inputHashHex = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // 타이밍 공격 방지를 위한 constant-time 비교
    return constantTimeCompare(inputHashHex, originalHashHex);
  } catch (error) {
    console.error("Password verification error:", error);
    return false;
  }
}

/**
 * Constant-time 문자열 비교 (타이밍 공격 방지)
 */
function constantTimeCompare(a: string, b: string): boolean {
  // 길이가 다르면 false (하지만 여전히 전체 비교 수행)
  if (a.length !== b.length) {
    // 길이 차이를 숨기기 위해 더미 비교 수행
    b = a;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0 && a.length === b.length;
}
