import { PaginationEllipsis, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { JSX } from 'react';

export const generatePaginationLinks = (currentPage: number, totalPages: number, path: string, pageQuery: string = '?page=') => {
    const pages: JSX.Element[] = [];
    if (totalPages <= 6) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink href={path + pageQuery + i} isActive={i === currentPage}>
                        {i}
                    </PaginationLink>
                </PaginationItem>,
            );
        }
    } else {
        for (let i = 1; i <= 2; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink href={path + pageQuery + i} isActive={i === currentPage}>
                        {i}
                    </PaginationLink>
                </PaginationItem>,
            );
        }
        if (2 < currentPage && currentPage < totalPages - 1) {
            pages.push(<PaginationEllipsis />);
            pages.push(
                <PaginationItem key={currentPage}>
                    <PaginationLink href="" isActive={true}>
                        {currentPage}
                    </PaginationLink>
                </PaginationItem>,
            );
        }
        pages.push(<PaginationEllipsis />);
        for (let i = totalPages - 1; i <= totalPages; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink href={path + pageQuery + i} isActive={i === currentPage}>
                        {i}
                    </PaginationLink>
                </PaginationItem>,
            );
        }
    }
    return pages;
};
