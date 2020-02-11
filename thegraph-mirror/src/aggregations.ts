import { TRANSACTION_TYPE } from "./types";

/**
 * calculates the total fee issued by borrow transactions per token
 */
export const BORROWS_FEE = [
  {
    $match: {
      type: TRANSACTION_TYPE.BORROW
    }
  },
  {
    $group: {
      _id: "$symbol",
      fee: {
        $sum: {
          $multiply: ["$amount", 0.0025]
        }
      }
    }
  },
  { $sort: { _id: 1 } },
  {
    $group: {
      _id: null,
      data: {
        $push: {
          k: "$_id",
          v: "$fee"
        }
      }
    }
  },
  {
    $project: {
      _id: TRANSACTION_TYPE.BORROW,
      data: {
        $arrayToObject: "$data"
      }
    }
  },
  {
    $merge: {
      into: "stats",
      on: "_id"
    }
  }
];

/**
 * calculates the total fee already payed by repay transactions per token
 */
export const REPAYS_FEE = [
  {
    $match: {
      type: TRANSACTION_TYPE.REPAY
    }
  },
  {
    $group: {
      _id: "$symbol",
      fee: {
        $sum: "$fee"
      }
    }
  },
  { $sort: { _id: 1 } },
  {
    $group: {
      _id: null,
      data: {
        $push: {
          k: "$_id",
          v: "$fee"
        }
      }
    }
  },
  {
    $project: {
      _id: TRANSACTION_TYPE.REPAY,
      data: {
        $arrayToObject: "$data"
      }
    }
  },
  {
    $merge: {
      into: "stats",
      on: "_id"
    }
  }
];

/**
 * calculates the total fee issued by flashLoan transactions per token
 */
export const FLASH_LOAN_FEE = [
  {
    $match: {
      type: TRANSACTION_TYPE.FLASH_LOAN
    }
  },
  {
    $group: {
      _id: "$symbol",
      fee: {
        $sum: {
          $multiply: ["$amount", 0.0035]
        }
      }
    }
  },
  { $sort: { _id: 1 } },
  {
    $group: {
      _id: null,
      data: {
        $push: {
          k: "$_id",
          v: "$fee"
        }
      }
    }
  },
  {
    $project: {
      _id: TRANSACTION_TYPE.FLASH_LOAN,
      data: {
        $arrayToObject: "$data"
      }
    }
  },
  {
    $merge: {
      into: "stats",
      on: "_id"
    }
  }
];

/**
 * aggregates data over a given time interval (48h), per symbol, per transaction type
 */
export const TIME_AGGREGATED_DATA = [
  {
    $addFields: {
      yearMonthDayHour: {
        $dateToString: {
          // format to a somehow proper js compatible datestring
          format: "%Y-%m-%d %H:00",
          date: {
            $toDate: {
              $subtract: [
                { $toLong: { $multiply: "$timestamp" } },
                {
                  $mod: [{ $toLong: { $multiply: "$timestamp" } }, 3600000 * 48]
                }
              ]
            }
          }
        }
      }
    }
  },
  {
    $group: {
      _id: {
        date: "$yearMonthDayHour",
        token: "$symbol",
        type: "$type"
      },
      amount: {
        $sum: "$amount"
      }
    }
  },
  { $sort: { "_id.date": 1 } },
  {
    $group: {
      _id: "AGGREGATED_DATA",
      data: {
        $push: "$$ROOT"
      }
    }
  },
  {
    $merge: {
      into: "stats",
      on: "_id"
    }
  }
];
