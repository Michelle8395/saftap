/**
 * M-Pesa Types
 * TypeScript interfaces for Daraja API integration
 */

export interface MpesaB2CParams {
  /** Recipient phone number in format +254XXXXXXXXX */
  phoneNumber: string;
  /** Amount in KES */
  amountKes: number;
  /** Unique transaction ID from our system */
  transactionId: string;
  /** Recipient name/label */
  recipientLabel: string;
}

export interface MpesaB2BParams {
  /** Till number (Paybill code or Till number) */
  tillNumber: string;
  /** Amount in KES */
  amountKes: number;
  /** Unique transaction ID from our system */
  transactionId: string;
  /** Account reference (required for Paybill) */
  accountRef?: string;
}

/**
 * Daraja OAuth Token Response
 */
export interface DarajaTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

/**
 * Daraja B2C Request Body
 */
export interface DarajaB2CRequestBody {
  OriginatorConversationID: string;
  InitiatorName: string;
  SecurityCredential: string;
  CommandID: "BusinessPayment";
  Amount: number;
  PartyA: string;
  PartyB: string;
  Remarks: string;
  QueueTimeOutURL: string;
  ResultURL: string;
}

/**
 * Daraja B2C Response
 */
export interface DarajaB2CResponse {
  OriginatorConversationID: string;
  ConversationID: string;
  ResponseDescription: string;
}

/**
 * Daraja B2B Request Body
 */
export interface DarajaB2BRequestBody {
  OriginatorConversationID: string;
  InitiatorName: string;
  SecurityCredential: string;
  CommandID: "BusinessBuyGoods" | "BusinessPayBill";
  SenderIdentifierType: number;
  ReceiverIdentifierType: number;
  Amount: number;
  PartyA: string;
  PartyB: string;
  Remarks: string;
  AccountReference?: string;
  QueueTimeOutURL: string;
  ResultURL: string;
}

/**
 * Daraja B2B Response
 */
export interface DarajaB2BResponse {
  OriginatorConversationID: string;
  ConversationID: string;
  ResponseDescription: string;
}

/**
 * Callback Result from Daraja
 */
export interface DarajaCallbackResult {
  ResultCode: number;
  ResultDesc: string;
  OriginatorConversationID: string;
  ConversationID: string;
  TransactionID: string;
  ReceiptNumber?: string;
}

/**
 * Callback metadata from Daraja
 */
export interface DarajaCallbackMetadata {
  Item?: Array<{
    Name: string;
    Value: string | number | boolean;
  }>;
}

/**
 * Daraja Webhook Callback Body
 * This is the structure Safaricom sends to our webhook endpoint
 */
export interface DarajaCallbackBody {
  Result: DarajaCallbackResult;
  Metadata?: DarajaCallbackMetadata;
}

/**
 * Cached token with expiration
 */
export interface CachedToken {
  token: string;
  expiresAt: number;
}
