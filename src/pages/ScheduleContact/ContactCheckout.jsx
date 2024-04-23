import { useEffect, useState } from 'react';

import { Text, Button } from '../../components';
import { CreditCardOutlineIcon } from '../../assets/svgs';

const PlanChip = ({ plan }) => {
  const planColor =
    {
      'Subscription 1': '243, 120, 8',
      'Subscription 2': '120, 150, 200', // NOTE: 임의의 데이터
      'Subscription 3': '35, 240, 105' // NOTE: 임의의 데이터
    }[plan] || '50, 50, 50';

  return (
    <div
      className="flex h-6 items-center rounded px-2 py-0.5"
      style={{
        backgroundColor: `rgba(${planColor}, 0.1)`,
        border: `1px solid rgba(${planColor}, 1)`,
        color: `rgba(${planColor}, 1)`
      }}
    >
      <span className="text-small font-medium">{plan}</span>
    </div>
  );
};

const CheckoutRow = ({ children, label }) => {
  return (
    <li className="flex w-full flex-row items-center justify-between">
      <Text color="tertiary" text={label} />
      {children}
    </li>
  );
};

const ContactCheckout = ({ plan, checkedData, discount }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(checkedData?.reduce((acc, cur) => acc + cur.price, 0));
  }, [checkedData]);

  return (
    <div className="shadow-primary w-[400px] rounded-2xl bg-bg-inner p-3">
      <ul className="flex w-full flex-col gap-2 p-3">
        <CheckoutRow label="Plan">
          <PlanChip plan={plan} />
        </CheckoutRow>
        <CheckoutRow label="Price">
          <Text text={`$${price}`} />
        </CheckoutRow>
        <CheckoutRow label="Discount">
          <Text text={`- $${discount}`} />
        </CheckoutRow>
      </ul>
      <div className="mt-3 flex flex-row items-center justify-between">
        <div className="pl-3">
          <Text text={`${checkedData.length} Selected`} />
        </div>
        <div className="h-4 w-[1px] bg-border-primary" />
        <div className="flex flex-row items-center gap-2">
          <Text text="total" color="tertiary" />
          <Text text={`$${price + discount}`} weight="semibold" size="medium" />
        </div>
        <div className="h-4 w-[1px] bg-border-primary" />
        <Button icon={<CreditCardOutlineIcon className="[&_path]:stroke-white" />} text="Checkout" type="primary" />
      </div>
    </div>
  );
};

export default ContactCheckout;
