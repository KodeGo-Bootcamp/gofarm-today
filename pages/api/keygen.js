import axios from "axios"

export default async function keygen(request, response) {
    const url = `https://t6gr3troewupiezqfp5qbodhca0iacrs.lambda-url.ap-southeast-2.on.aws/encrypt`
        + `/${process.env.OPENAI_API_KEY}`
    const encryptedApiKey = await axios.get(url).then((axiosResponse) => {
        return axiosResponse.data.encrypted_openai_api_key
    })

    response.json({ encrypted_api_key: encryptedApiKey })
}