// @ts-ignore
import React from "react"
import "@testing-library/jest-dom"
import {act, render} from "@testing-library/react";
import Orders from "@/pages/orders";
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store'

test("type buy status all", async () => {
    const store = configureStore()
    const state = {
        theme: "light",
        order: {
            tab: "buy",
            filter: "all",
        }
    }
    const res = await act(async () => {
        return render(
            <Provider store={store(state)}>
                <Orders status={200} message={"ok"}/>
            </Provider>
        )
    })
    expect(res.baseElement).toMatchSnapshot()
})

test("type sell status pending", async () => {
    const store = configureStore()
    const state = {
        theme: "light",
        order: {
            tab: "sell",
            filter: "pending",
        }
    }
    const res = await act(async () => {
        return render(
            <Provider store={store(state)}>
                <Orders status={200} message={"ok"}/>
            </Provider>
        )
    })
    expect(res.baseElement).toMatchSnapshot()
})
