import {client} from '@/app/global/sanity/client'
import {MONTHBOOKS_QUERY} from './api/fetchMonth'
import { MonthModel } from './model/month'
import AllMonths from './components/all_months'
import SingularMonth from './components/singular_month'

export default async function PostIndex() {
  const months: MonthModel[] = await client.fetch(MONTHBOOKS_QUERY)

  return (
    <AllMonths months={months} />
  )
}