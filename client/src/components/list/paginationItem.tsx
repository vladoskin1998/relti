import React, { ReactElement } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationItem({
  page,
  changePage,
  totalPages,
}: {
  page: number,
  changePage: (p: number) => void,
  totalPages: number,
}): ReactElement {
  return (
    <Stack spacing={2}>
      <Pagination count={totalPages}
        variant="outlined"
        onChange={(e, p) => changePage(p)}
        page={page} shape="rounded" />
    </Stack>
  );
}
