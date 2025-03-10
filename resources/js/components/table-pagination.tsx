import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { type PaginatedResponse } from '@/types';
import { generatePaginationLinks } from '@/lib/generate-pagination-links';

export function TablePagination({ resource }: { resource: PaginatedResponse }) {
    if (resource.last_page === 1) {
        return (
            <div className={'mt-4 text-center text-gray-500'}>
                No more items to show.
            </div>
        );
    }

    return (
        <Pagination className='mt-4'>
            <PaginationContent>
                <PaginationItem>
                    {resource.prev_page_url
                        ? <PaginationPrevious href={resource.prev_page_url} />
                        : null
                    }
                </PaginationItem>

                {generatePaginationLinks(resource.current_page, resource.last_page, resource.path)}

                <PaginationItem>
                    {resource.next_page_url
                        ? <PaginationNext href={resource.next_page_url} />
                        : null
                    }
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
