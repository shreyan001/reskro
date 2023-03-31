import React, { useState } from "react";
import "./style.css";

interface Teammate {
  address: string;
}

interface Deposit {
  amount: number;
  currency: string;
}

interface SafeProps {
  yourAddress: string;
  previousSafes: any;
}

interface IssueSafeProps {
  onSubmit: (teammates: string[], deposit: Deposit) => void;
}

export default function IssueSafe(props: SafeProps & IssueSafeProps) {
  const [teammates, setTeammates] = useState<Teammate[]>([]);
  const [deposit, setDeposit] = useState<Deposit>({
    amount: 0,
    currency: "ETH",
  });

  const handleAddTeammate = () => {
    setTeammates([...teammates, { address: "" }]);
  };

  const handleTeammateChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTeammates = [...teammates];
    newTeammates[index].address = event.target.value;
    setTeammates(newTeammates);
  };

  const handleDepositChange = (
    field: keyof Deposit,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setDeposit({
      ...deposit,
      [field]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const teammateAddresses = teammates.map((teammate) => teammate.address);
    props.onSubmit(teammateAddresses, deposit);
  };

  return (
    <div className="safe-container">
      <div className="safe-sidebar">
        <div>Your Address: {props.yourAddress}</div>
        <div>Previous Safes Created: {props.previousSafes.join(", ")}</div>
      </div>
      <div className="safe-main">
        <h1>Issue Safe</h1>
        <form onSubmit={handleSubmit}>
          <div className="teammates-container">
            {teammates.map((teammate, index) => (
              <input
                key={index}
                type="text"
                placeholder="Enter Ethereum Address"
                value={teammate.address}
                onChange={(event) => handleTeammateChange(index, event)}
              />
            ))}
            <button className="btn1" type="button" onClick={handleAddTeammate}>
              +
            </button>
          </div>
          <div className="teammates-list">
            {teammates.map((teammate, index) => (
              <div key={index}>{teammate.address}</div>
            ))}
          </div>
          <div className="deposit-container">
            <input
              type="number"
              placeholder="Deposit Amount"
              value={deposit.amount}
              onChange={(event) => handleDepositChange("amount", event)}
            />
            <select
              value={deposit.currency}
              onChange={(event) => handleDepositChange("currency", event)}
            >
              <option value="ETH">ETH</option>
              <option value="USDT">USDT</option>
              <option value="DAI">DAI</option>
            </select>
            <button className="btn1" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
