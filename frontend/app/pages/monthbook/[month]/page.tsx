import { client } from "@/app/global/sanity/client"
import { MONTHBOOK_QUERY } from "../api/fetchMonth"
import { MonthModel } from "../model/month"
import SingularMonth from "../components/singular_month"

export default async function MonthPage({ params }: { params: { month: string } }) {
    const { month } = await params
    const monthData: MonthModel = await client.fetch(MONTHBOOK_QUERY, { month: month })
    return <SingularMonth month={monthData} />
}