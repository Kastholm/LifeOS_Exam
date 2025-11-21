//https://ui.shadcn.com/docs/components/pagination
'use client'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/app/global/shadcn/components/ui/pagination"
  import { useSearchParams, usePathname, useRouter } from 'next/navigation';

  export default function PaginationTest({currentPage} : {currentPage: number}) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function clickTest(num: number) {
        num = currentPage + num
        if(num <= 0) {
            num = 1;
        }
        const params = new URLSearchParams(searchParams);
        params.set('page', String(num))
        replace(`${pathname}?${params.toString()}`)
        console.log(num)
    }

    return (
        <Pagination>
        <PaginationContent>
            <PaginationItem>
            <PaginationPrevious onClick={() => clickTest(-1)} />
            </PaginationItem>
            <PaginationItem>
            <PaginationLink>{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
            <PaginationNext onClick={() => clickTest(1)}/>
            </PaginationItem>
        </PaginationContent>
        </Pagination>
    )
  }