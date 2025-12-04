export class JokeModel {
    value!: string
}

export default async function ChuckNorris() {

    let joke = ''
    try {
        let res = await fetch('https://api.chucknorris.io/jokes/random')
        let data: JokeModel = await res.json()
        joke = data.value
    } catch(err){
        console.error("Couldn't fetch, error:", err)
    }

    return (
        <div className="w-[80%] m-auto text-sm mb-12 p-2 bg-amber-600 rounded-md">
            <p>{joke}</p>
            <img className="mt-4 w-36 m-auto" src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" alt="" />
            </div>
    )
}