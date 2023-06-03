const DecodeJwtTokenPayload = async (cookies: any) => {
    const sortedAuthCookie = cookies?.auth.split(':')[1].split('.')
    const newSortedAuthCookie = sortedAuthCookie.slice(0, -1).join('.')

    const [decodedHeader, decodedPayload, signature] = newSortedAuthCookie.split('.')
    const [header, payload] = [decodedHeader, decodedPayload].map(DecodeTokenComponent)

    header
    signature

    return payload
}

function DecodeTokenComponent(value: any) {
    const buff = Buffer.from(value, 'base64')
    const text = buff.toString('ascii')
    return JSON.parse(text)
}

export default DecodeJwtTokenPayload
