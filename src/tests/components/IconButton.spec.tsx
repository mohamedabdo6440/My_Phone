// @ts-ignore
import React from "react"
import '@testing-library/jest-dom'
import IconButton from "@/components/buttons/IconButton"
import {StaticImageData} from "next/image"
import {render} from "@testing-library/react"

test("test", () => {
    const image: StaticImageData = {
        src: "/favicon.ico",
        width: 23,
        height: 34,
    }
    const res = render(
        <IconButton image={image} name={"machin"} value={"truc"} />
    )
    const el = res.getByRole("img")
    expect(el).toBeInTheDocument()
})
