export type ActiveTab =
  | 'incorporation'
  | 'documents'
  | 'pitch'
  | 'raise'
  | 'captable'
  | 'team'
  | 'agreements'
  | 'agentic'
  | 'calendar'
  | 'settings';

export interface CompanyOverview {
  name: string;
  suffix: string;
  targetClosing: string;
  state: string;
  incorporationDate: string;
  delawareFileNumber: string;
  ein: string;
  totalAuthorizedShares: number;
  reservedEquityPool: number;
  parValue: number;
  registeredAgent: {
    name: string;
    address: string;
    email: string;
  };
}

export interface Stockholder {
  id: string;
  name: string;
  email: string;
  shareClass: 'Common' | 'Preferred' | 'Options';
  shareCount: number;
  pricePerShare: number;
  vestingYears: number;
  cliffMonths: number;
  vestingStartDate: string;
  hasRestrictedStock: boolean;
  election83bFiled: boolean;
  election83bDeadline: string;
  avatarUrl?: string;
}

export interface LegalDocument {
  id: string;
  name: string;
  category: 'Incorporation' | 'Board' | 'Stock' | 'IP & Protection' | 'Tax';
  shareCountText: string;
  signatureStatus: string; // e.g. "1/1", "-"
  isSigned: boolean;
  signedDate?: string;
  description: string;
  content: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'urgent' | 'info' | 'success';
}
