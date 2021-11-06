import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Button } from 'semantic-ui-react';

import { QUERY_CHECKOUT } from '../../utils/queries';

import './DonationButton.scss';

import stripePromise from '../../utils/stripe-promise';

function DonationButton({ donationAmount }) {
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
    
    useEffect(() => {
        if (data) {
          stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: data.checkout.session });
          });
        }
      }, [data]);

    function clickHandler() {
        getCheckout({
            variables: {
                donationAmount
            }
        });
    }

    return (
        <Button
            className="donation-btn"
            color="purple"
            onClick={clickHandler}
        >
            {`Donate $${donationAmount}`}
        </Button>
    )
}

export default DonationButton;
