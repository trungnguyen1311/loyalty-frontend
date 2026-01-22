// Customer types
export interface Customer {
  id: string;
  name: string;
  email: string;
  level: string;
  points: number;
  avatar?: string;
}

// Voucher types
export interface Voucher {
  code: string;
  name: string;
  discount: string;
  value: number;
}

// Transaction types
export interface TransactionConfig {
  customer: Customer;
  voucher?: Voucher;
  pointsToUse: number;
  billValue: number;
}

export interface DiscountCalculation {
  voucherDiscount: number;
  pointsDiscount: number;
  totalDiscount: number;
  netPayable: number;
  pointsEarned: number;
}
