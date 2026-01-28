import React from "react";
import styles from "./DiscountCalculationCard.module.scss";
import { cn } from "@/lib/utils";

interface DiscountCalculationCardProps {
  voucher: number | string;
  pointsSpent: number | string;
  totalDiscount: number | string;
  netPayable: number | string;
  pointsToEarn: number | string;
  className?: string;
}

export const DiscountCalculationCard: React.FC<
  DiscountCalculationCardProps
> = ({
  voucher,
  pointsSpent,
  totalDiscount,
  netPayable,
  pointsToEarn,
  className,
}) => {
  return (
    <div className={cn(styles.shadowWrapper, className)}>
      <div className={styles.receiptCard}>
        {/* Success Icon */}
        <div className={styles.successOuter}>
          <div className={styles.successInner}>
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.33334 6L5.33334 10L14.6667 1.33334"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Header */}
        <h3 className={styles.headerText}>Discount calculator</h3>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Rows Container */}
        <div className={styles.rowContainer}>
          <div className={styles.row}>
            <span className={styles.label}>Voucher:</span>
            <span className={styles.value}>€{voucher}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Points spent</span>
            <span className={styles.value}>€{pointsSpent}</span>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Total Row */}
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total discount</span>
          <span className={styles.totalValue}>€{totalDiscount}</span>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.netPayable}>Net payable: €{netPayable}</p>
          <p className={styles.pointsEarned}>
            +{pointsToEarn} points upon completion
          </p>
        </div>
      </div>
    </div>
  );
};
