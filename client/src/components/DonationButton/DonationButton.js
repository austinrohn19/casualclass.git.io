import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from 'semantic-ui-react';

import { QUERY_CHECKOUT } from '../../utils/queries';

import './DonationButton.scss';

const stripePromise = loadStripe('pk_test_51JsZWdC8beZ8JNQHSstkmD0hVhQMwckPC8NMry8bJiaWDhEGCdezAOI7f9tncBSUo4T01bfwZfftQOcdGt0wyXG200La39BRoj');

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
