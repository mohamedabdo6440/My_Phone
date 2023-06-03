import React from "react"
import '@testing-library/jest-dom'
import {render} from "@testing-library/react"
import StripeCheckoutForm from '@/components/forms/StripeCheckoutForm'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

test("test", () => {
    const store = configureStore()
    const state = {
        product: 1,
        payload: {},
        home: {
            page: "buy",
        },
        buy: {
            product: {},
            payload: {},
        },
        order: {
            checkout: {},
            quantity: 1,
            total: 10,
        },
    }
    const res = render(
        <Provider store={store(state)}>
            <StripeCheckoutForm />
        </Provider>
    )
    expect(res.baseElement).toMatchInlineSnapshot(`
<body>
  <div>
    <form
      id="payment-form"
    >
      <div
        id="payment-element"
      />
      <button
        disabled=""
        id="submit"
      >
        <span
          id="button-text"
        >
          Checkout with Stripe
        </span>
      </button>
    </form>
  </div>
</body>
`)
})
