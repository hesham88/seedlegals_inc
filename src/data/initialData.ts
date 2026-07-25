import { CompanyOverview, Stockholder, LegalDocument, NotificationItem } from '../types';

export const initialCompany: CompanyOverview = {
  name: 'Apex Dynamics',
  suffix: 'Inc.',
  targetClosing: '1 Jul 2026',
  state: 'Delaware',
  incorporationDate: '2026-06-29',
  delawareFileNumber: '8934102',
  ein: 'Pending (Agent filing in progress)',
  totalAuthorizedShares: 10000000,
  reservedEquityPool: 1000000,
  parValue: 0.00001,
  registeredAgent: {
    name: 'Delaware Registered Agent Service Inc.',
    address: '1209 North Orange Street, Wilmington, DE 19801',
    email: 'support@delaware-registered-agent.com',
  },
};

export const initialStockholders: Stockholder[] = [
  {
    id: 'sh-1',
    name: 'Alex Morgan',
    email: 'alex.morgan@apexdynamics.example',
    shareClass: 'Common',
    shareCount: 9000000,
    pricePerShare: 0.00001,
    vestingYears: 4,
    cliffMonths: 12,
    vestingStartDate: '2026-06-29',
    hasRestrictedStock: true,
    election83bFiled: false,
    election83bDeadline: '2026-08-06',
  },
];

export const initialDocuments: LegalDocument[] = [
  {
    id: 'doc-coi',
    name: 'Certificate of Incorporation',
    category: 'Incorporation',
    shareCountText: '-',
    signatureStatus: '1/1',
    isSigned: true,
    signedDate: '2026-06-29',
    description: 'This is the document required to form your Delaware C corp. Approved by the Delaware Division of Corporations.',
    content: `STATE OF DELAWARE
CERTIFICATE OF INCORPORATION
A STOCK CORPORATION

ARTICLE I
The name of the Corporation is Apex Dynamics Inc.

ARTICLE II
The address of the Corporation's registered office in the State of Delaware is 1209 North Orange Street, Wilmington, DE 19801. The name of its registered agent at such address is Delaware Registered Agent Service Inc.

ARTICLE III
The purpose of the Corporation is to engage in any lawful act or activity for which corporations may be organized under the General Corporation Law of the State of Delaware (DGCL).

ARTICLE IV
The total number of shares of stock which the Corporation shall have authority to issue is 10,000,000 shares of Common Stock, par value $0.00001 per share.

IN WITNESS WHEREOF, the undersigned, being the incorporator hereinbefore named, has executed this Certificate of Incorporation on June 29, 2026.

/s/ Alex Morgan
Alex Morgan, Incorporator`,
  },
  {
    id: 'doc-asi',
    name: 'Action of Sole Incorporator',
    category: 'Board',
    shareCountText: '-',
    signatureStatus: '1/1',
    isSigned: true,
    signedDate: '2026-06-29',
    description: 'Action taken by the sole incorporator appointing the initial Board of Directors and adopting corporate bylaws.',
    content: `APEX DYNAMICS INC.
ACTION OF SOLE INCORPORATOR

Pursuant to Section 108 of the General Corporation Law of the State of Delaware, the undersigned, being the sole incorporator of Apex Dynamics Inc., hereby adopts the following resolutions:

1. ADOPTION OF BYLAWS
RESOLVED, that the Bylaws attached hereto as Exhibit A are hereby adopted as the Bylaws of the Corporation.

2. ELECTION OF DIRECTORS
RESOLVED, that Alex Morgan is hereby elected as the sole member of the Board of Directors of the Corporation, to serve until the first annual meeting of stockholders or until a successor is duly elected and qualified.

EXECUTED as of June 29, 2026.

/s/ Alex Morgan
Alex Morgan, Sole Incorporator`,
  },
  {
    id: 'doc-bylaws',
    name: 'Corporate Bylaws',
    category: 'Incorporation',
    shareCountText: '1/1',
    signatureStatus: '-',
    isSigned: true,
    signedDate: '2026-06-29',
    description: 'Governing rules and operational procedures for Apex Dynamics Inc.',
    content: `BYLAWS OF APEX DYNAMICS INC.
(A Delaware Corporation)

ARTICLE I - OFFICES
Section 1. Registered Office. The registered office of Apex Dynamics Inc. in the State of Delaware shall be established and maintained at 1209 North Orange Street, Wilmington, DE 19801.

ARTICLE II - MEETINGS OF STOCKHOLDERS
Section 1. Annual Meeting. An annual meeting of stockholders shall be held for the election of directors at such date, time, and place as designated by the Board of Directors.
Section 2. Voting. Each stockholder shall be entitled to one vote for each share of capital stock held by such stockholder.

ARTICLE III - DIRECTORS
Section 1. Powers. The business and affairs of the Corporation shall be managed by or under the direction of the Board of Directors.

ARTICLE IV - OFFICERS
Section 1. Officers. The officers of the Corporation shall consist of a Chief Executive Officer, a President, a Secretary, and a Treasurer/Chief Financial Officer.`,
  },
  {
    id: 'doc-csb',
    name: 'Certificate of Secretary regarding Bylaws',
    category: 'Board',
    shareCountText: '-',
    signatureStatus: '1/1',
    isSigned: true,
    signedDate: '2026-06-29',
    description: 'Certified document by the Corporate Secretary attesting to the official adoption of the Corporate Bylaws.',
    content: `APEX DYNAMICS INC.
CERTIFICATE OF SECRETARY

I, Alex Morgan, hereby certify that:
1. I am the duly elected and acting Secretary of Apex Dynamics Inc., a Delaware corporation (the "Company").
2. Attached hereto as Exhibit A is a true, correct, and complete copy of the Bylaws of the Company as adopted by the Board of Directors.

IN WITNESS WHEREOF, I have executed this Certificate as of June 29, 2026.

/s/ Alex Morgan
Alex Morgan, Corporate Secretary`,
  },
  {
    id: 'doc-iabd',
    name: 'Initial Actions by the Board of Directors',
    category: 'Board',
    shareCountText: '1/1',
    signatureStatus: '1/1',
    isSigned: true,
    signedDate: '2026-06-29',
    description: 'Formal resolutions establishing corporate officers, banking authorization, equity pool reservation, and stock issuance.',
    content: `APEX DYNAMICS INC.
ACTION BY UNANIMOUS WRITTEN CONSENT OF THE BOARD OF DIRECTORS IN LIEU OF INITIAL MEETING

In accordance with Section 141(f) of the Delaware General Corporation Law, the undersigned, constituting all members of the Board of Directors of Apex Dynamics Inc., hereby consent to the adoption of the following resolutions:

1. APPOINTMENT OF OFFICERS
RESOLVED, that Alex Morgan is appointed to the offices of Chief Executive Officer, President, Secretary, and Treasurer.

2. AUTHORIZATION OF STOCK ISSUANCE
RESOLVED, that the Company is authorized to issue 9,000,000 shares of Common Stock at $0.00001 per share to Alex Morgan subject to a Stock Restriction Agreement.

3. EQUITY INCENTIVE POOL
RESOLVED, that 1,000,000 shares of Common Stock are reserved for the Company's 2026 Equity Incentive Plan.

DATED: June 29, 2026
/s/ Alex Morgan`,
  },
  {
    id: 'doc-sc',
    name: 'Stockholder Consent',
    category: 'Stock',
    shareCountText: '1/1',
    signatureStatus: '1/1',
    isSigned: true,
    signedDate: '2026-06-29',
    description: 'Consent of the initial stockholders approving corporate charter terms and organizational actions.',
    content: `APEX DYNAMICS INC.
UNANIMOUS WRITTEN CONSENT OF STOCKHOLDERS

The undersigned stockholders of Apex Dynamics Inc., holding 100% of the voting power of the Company, hereby adopt the following resolutions:

RESOLVED, that all actions previously taken by the Board of Directors in connection with the organization of the Company and the issuance of founder equity are hereby ratified and approved in all respects.

DATED: June 29, 2026
Stockholder: Alex Morgan (9,000,000 shares)
Signature: /s/ Alex Morgan`,
  },
  {
    id: 'doc-spa',
    name: 'Stock Purchase Agreement',
    category: 'Stock',
    shareCountText: '1/1',
    signatureStatus: '1/1',
    isSigned: true,
    signedDate: '2026-06-29',
    description: 'Agreement governing the purchase and issuance of 9,000,000 shares of founder Common Stock at $0.00001 per share.',
    content: `APEX DYNAMICS INC.
FOUNDER STOCK PURCHASE AGREEMENT

This Founder Stock Purchase Agreement is made between Apex Dynamics Inc. (the "Company") and Alex Morgan (the "Purchaser").

1. Purchase and Sale of Stock. The Company hereby agrees to sell and issue to Purchaser, and Purchaser hereby agrees to purchase, 9,000,000 shares of Common Stock at $0.00001 per share, for an aggregate purchase price of $90.00.

2. Repurchase Option & Vesting. The Stock shall be subject to standard 4-year vesting with a 1-year cliff, governed by the Stock Restriction Agreement.

DATED: June 29, 2026
Purchaser: /s/ Alex Morgan
Company: Apex Dynamics Inc. by /s/ Alex Morgan, CEO`,
  },
  {
    id: 'doc-sra',
    name: 'Stock Restriction Agreement',
    category: 'Stock',
    shareCountText: '1/1',
    signatureStatus: '1/1',
    isSigned: true,
    signedDate: '2026-06-29',
    description: 'Imposes 4-year vesting schedule (25% cliff at 12 months, 1/48th monthly thereafter) and company repurchase option on unvested founder shares.',
    content: `APEX DYNAMICS INC.
STOCK RESTRICTION AGREEMENT

This Stock Restriction Agreement is entered into between Apex Dynamics Inc. and Alex Morgan.

VESTING SCHEDULE:
- Total Shares Subject to Restriction: 9,000,000 Common Shares
- Vesting Commencement Date: June 29, 2026
- One-Year Cliff: 25% (2,250,000 shares) vest on June 29, 2027.
- Monthly Vesting: Remaining 75% vests in 36 equal monthly installments thereafter.

IRS 83(b) ELECTION NOTICE:
Purchaser acknowledges that an 83(b) election must be filed with the Internal Revenue Service within 30 days of the date hereof.

DATED: June 29, 2026
/s/ Alex Morgan`,
  },
  {
    id: 'doc-83b',
    name: '83(b) Election',
    category: 'Tax',
    shareCountText: '1/1',
    signatureStatus: '1/1',
    isSigned: true,
    signedDate: '2026-07-02',
    description: 'Internal Revenue Code Section 83(b) Election form ready for IRS filing before the August 6, 2026 statutory deadline.',
    content: `DEPARTMENT OF THE TREASURY - INTERNAL REVENUE SERVICE
ELECTION PURSUANT TO SECTION 83(b) OF THE INTERNAL REVENUE CODE

The undersigned taxpayer hereby elects under Section 83(b) of the Internal Revenue Code to include in gross income for the current taxable year the excess, if any, of the fair market value of the property transferred over the amount paid for such property.

1. Taxpayer Name: Alex Morgan
2. Social Security / Tax ID Number: XXX-XX-9821
3. Description of Property: 9,000,000 shares of Common Stock of Apex Dynamics Inc.
4. Date Property Transferred: June 29, 2026
5. Taxable Year: 2026
6. Fair Market Value at Time of Transfer: $0.00001 per share ($90.00 Total)
7. Amount Paid for Property: $90.00

A copy of this election has been submitted to Apex Dynamics Inc. and must be mailed to the IRS service center where the taxpayer files their personal income tax return within 30 days of transfer.

Taxpayer Signature: /s/ Alex Morgan
Date: July 2, 2026`,
  },
  {
    id: 'doc-indemnity',
    name: 'Director and Officer Indemnification Agreement',
    category: 'IP & Protection',
    shareCountText: '1/1',
    signatureStatus: '1/1',
    isSigned: true,
    signedDate: '2026-06-29',
    description: 'Comprehensive liability protection for directors and officers against corporate lawsuits and claims.',
    content: `APEX DYNAMICS INC.
DIRECTOR AND OFFICER INDEMNIFICATION AGREEMENT

This Indemnification Agreement is entered into by Apex Dynamics Inc. and Alex Morgan ("Indemnitee").

The Company shall indemnify Indemnitee to the fullest extent permitted by Delaware law against all expenses, judgments, fines, and settlements incurred in connection with any legal proceeding arising from Indemnitee's service as a director or officer.

/s/ Alex Morgan`,
  },
  {
    id: 'doc-ciiaa',
    name: 'Confidential Information and Invention Assignment Agreement',
    category: 'IP & Protection',
    shareCountText: '1/1',
    signatureStatus: '1/1',
    isSigned: true,
    signedDate: '2026-06-29',
    description: 'Ensures 100% of pre-existing and future intellectual property created by the founder belongs strictly to Apex Dynamics Inc.',
    content: `APEX DYNAMICS INC.
CONFIDENTIAL INFORMATION AND INVENTION ASSIGNMENT AGREEMENT (CIIAA)

This Agreement is made between Apex Dynamics Inc. and Alex Morgan.

1. Intellectual Property Assignment. Executive hereby assigns and transfers exclusively to the Company all right, title, and interest in and to any and all inventions, trade secrets, software, graphics, ideas, or works created in connection with the Company's business.
2. Confidentiality. Executive agrees to keep strictly secret and non-disclosed all proprietary data, client records, and source code of the Company.

DATED: June 29, 2026
Signature: /s/ Alex Morgan`,
  },
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '83(b) Election Reminder',
    message: 'Every stockholder with restricted stock has 15 days (until Aug 6 2026) to file their 83(b) Election with the IRS.',
    time: '10 min ago',
    unread: true,
    type: 'urgent',
  },
  {
    id: 'notif-2',
    title: 'Certificate of Incorporation Approved',
    message: 'Delaware Division of Corporations approved your filing under File # 8934102.',
    time: '2 hours ago',
    unread: true,
    type: 'success',
  },
  {
    id: 'notif-3',
    title: 'Corporate Banking Partner',
    message: 'Once your EIN is issued, click to open your corporate banking account.',
    time: '1 day ago',
    unread: false,
    type: 'info',
  },
];
