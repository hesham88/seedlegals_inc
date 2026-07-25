export function maskName(name: string, _isMasked: boolean = true): string {
  if (!name) return '••••••';
  return name
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (word.length <= 1) return '*';
      return word[0] + '*'.repeat(Math.max(2, word.length - 1));
    })
    .join(' ');
}

export function maskEmail(email: string, _isMasked: boolean = true): string {
  if (!email) return '••••@••••.com';
  const parts = email.split('@');
  if (parts.length !== 2) return '••••••@••••.com';
  const [local, domain] = parts;
  const maskedLocal = local.length > 2 ? local.slice(0, 2) + '••••' : '••';
  return `${maskedLocal}@${domain}`;
}

export function maskPhone(_phone?: string, _isMasked: boolean = true): string {
  return '+1 (•••) •••-••••';
}

export function maskSSN(_ssn?: string, _isMasked: boolean = true): string {
  return '***-**-****';
}

export function maskEIN(ein?: string, _isMasked: boolean = true): string {
  if (ein && ein.includes('Pending')) return 'Pending (Privacy Redacted)';
  return '**-*******';
}

export function maskAccount(_acc?: string, _isMasked: boolean = true): string {
  return '•••• •••• ••••';
}

export function maskRouting(_routing?: string, _isMasked: boolean = true): string {
  return '•••••••••';
}

export function maskFileNum(_num?: string, _isMasked: boolean = true): string {
  return '••••••••';
}

export function maskCode(_code?: string, _isMasked: boolean = true): string {
  return '••••-••••-••••';
}

export function maskMoney(_amount?: number | string, _isMasked: boolean = true): string {
  return '$••••••';
}
