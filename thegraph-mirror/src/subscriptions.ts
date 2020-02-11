import gql from "graphql-tag";
import { TRANSACTION_TYPE } from "./types";

const DEPOSITS_SUBSCRIBE_QUERY = gql`
  subscription deposits($timestamp: Int!) {
    deposits(
      orderBy: timestamp
      orderDirection: asc
      where: { timestamp_gt: $timestamp }
    ) {
      id
      reserve {
        id
        symbol
        liquidityRate
        stableBorrowRate
        variableBorrowRate
      }
      timestamp
      amount
    }
  }
`;

const REDEEM_UNDERLAYINGS_SUBSCRIBE_QUERY = gql`
  subscription redeemUnderlyings($timestamp: Int!) {
    redeemUnderlyings(
      orderBy: timestamp
      orderDirection: asc
      where: { timestamp_gt: $timestamp }
    ) {
      id
      reserve {
        id
        symbol
        liquidityRate
        stableBorrowRate
        variableBorrowRate
      }
      timestamp
      amount
    }
  }
`;

const FLASH_LOANS_SUBSCRIBE_QUERY = gql`
  subscription flashLoans($timestamp: Int!) {
    flashLoans(
      orderBy: timestamp
      orderDirection: asc
      where: { timestamp_gt: $timestamp }
    ) {
      id
      reserve {
        id
        symbol
        liquidityRate
        stableBorrowRate
        variableBorrowRate
      }
      timestamp
      amount
    }
  }
`;

const BORROWS_SUBSCRIBE_QUERY = gql`
  subscription borrows($timestamp: Int!) {
    borrows(
      orderBy: timestamp
      orderDirection: asc
      where: { timestamp_gt: $timestamp }
    ) {
      id
      reserve {
        id
        symbol
        liquidityRate
        stableBorrowRate
        variableBorrowRate
      }
      timestamp
      amount
    }
  }
`;

const REPAYS_SUBSCRIBE_QUERY = gql`
  subscription repays($timestamp: Int!) {
    repays(
      orderBy: timestamp
      orderDirection: asc
      where: { timestamp_gt: $timestamp }
    ) {
      id
      reserve {
        id
        symbol
        liquidityRate
        stableBorrowRate
        variableBorrowRate
      }
      timestamp
      amountAfterFee
      fee
    }
  }
`;

export default {
  [TRANSACTION_TYPE.BORROW]: BORROWS_SUBSCRIBE_QUERY,
  [TRANSACTION_TYPE.DEPOSIT]: DEPOSITS_SUBSCRIBE_QUERY,
  [TRANSACTION_TYPE.FLASH_LOAN]: FLASH_LOANS_SUBSCRIBE_QUERY,
  [TRANSACTION_TYPE.REDEEM_UNDERLAYING]: REDEEM_UNDERLAYINGS_SUBSCRIBE_QUERY,
  [TRANSACTION_TYPE.REPAY]: REPAYS_SUBSCRIBE_QUERY
};
